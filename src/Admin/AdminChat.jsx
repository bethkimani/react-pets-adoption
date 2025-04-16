import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './AdminChat.css';

const socket = io('http://localhost:5174');

const AdminChat = () => {
  const [activeUsers, setActiveUsers] = useState([]);
  const [messagesByUser, setMessagesByUser] = useState({});
  const [currentRoom, setCurrentRoom] = useState(null);
  const [input, setInput] = useState('');

  useEffect(() => {
    socket.emit('register', { role: 'admin' });

    socket.on('active_users', (users) => {
      console.log('Received active users:', users);
      setActiveUsers((prev) => {
        if (JSON.stringify(prev) !== JSON.stringify(users)) {
          return users;
        }
        return prev;
      });
    });

    socket.on('new_user', (roomId) => {
      console.log('New user joined:', roomId);
      setActiveUsers((prev) => {
        if (!prev.includes(roomId)) {
          return [...prev, roomId];
        }
        return prev;
      });
    });

    socket.on('message_received', (data) => {
      console.log('Admin received message:', data); // Debug log
      if (!data.room) return;

      setMessagesByUser((prev) => {
        const updated = { ...prev };
        if (!updated[data.room]) updated[data.room] = [];
        updated[data.room].push({
          sender: data.from,
          text: data.message,
          timestamp: data.timestamp
        });
        return updated;
      });

      if (!activeUsers.includes(data.room)) {
        setActiveUsers((prev) => [...prev, data.room]);
      }
    });

    return () => {
      socket.off('active_users');
      socket.off('new_user');
      socket.off('message_received');
    };
  }, []);

  const joinRoom = (room) => {
    setCurrentRoom(room);
    socket.emit('admin_join_room', room);
    console.log(`Admin joined room: ${room}`);
  };

  const sendMessage = () => {
    if (!input.trim() || !currentRoom) return;

    const messageData = {
      message: input,
      room: currentRoom,
      from: 'admin'
    };

    socket.emit('send_message', messageData);

    setMessagesByUser((prev) => {
      const updated = { ...prev };
      if (!updated[currentRoom]) updated[currentRoom] = [];
      updated[currentRoom].push({
        sender: 'admin',
        text: input,
        timestamp: new Date().toISOString()
      });
      return updated;
    });

    setInput('');
  };

  return (
    <div className="admin-panel">
      <div className="user-list">
        <h3>Active Users</h3>
        {activeUsers.map((user) => (
          <div
            key={user}
            className={`user-item ${user === currentRoom ? 'active' : ''}`}
            onClick={() => joinRoom(user)}
          >
            {user}
            {messagesByUser[user] &&
              messagesByUser[user].some((m) => m.sender === 'user') && (
                <span className="alert-dot" />
              )}
          </div>
        ))}
      </div>

      <div className="chat-area">
        <h3>Chat with: {currentRoom || 'Select a user'}</h3>
        <div className="messages">
          {currentRoom && messagesByUser[currentRoom] ? (
            messagesByUser[currentRoom].map((msg, i) => (
              <div key={i} className={`message ${msg.sender}`}>
                <div className="meta">
                  <strong>{msg.sender}</strong>
                  <small>{new Date(msg.timestamp).toLocaleTimeString()}</small>
                </div>
                <p>{msg.text}</p>
              </div>
            ))
          ) : (
            <p className="empty-chat">No messages yet</p>
          )}
        </div>
        {currentRoom && (
          <div className="input-area">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Type a reply..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminChat;
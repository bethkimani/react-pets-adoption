import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './AdminChat.css';

const socket = io('https://livechat-server-kz67.onrender.com');

const AdminChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    socket.emit('register', { role: 'admin' });

    socket.on('message_received', (data) => {
      setMessages((prev) => [
        ...prev,
        {
          sender: data.from,
          text: data.message,
          timestamp: data.timestamp
        }
      ]);
    });

    return () => {
      socket.off('message_received');
    };
  }, []);

  const sendMessage = () => {
    if (!input.trim()) return;

    const messageData = {
      message: input,
      from: 'admin'
    };

    socket.emit('send_message', messageData);


    setInput('');
  };

  return (
    <div className="admin-panel">
      <div className="user-list">
        <h3>Chat</h3>
      </div>

      <div className="chat-area">
        <h3>Chat with User</h3>
        <div className="messages">
          {messages.length > 0 ? (
            messages.map((msg, i) => (
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
      </div>
    </div>
  );
};

export default AdminChat;
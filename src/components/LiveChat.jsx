import { useState, useEffect, useRef } from 'react';
import { FaCommentDots } from 'react-icons/fa';
import io from 'socket.io-client';
import './LiveChat.css';

const socket = io('https://livechat-server-kz67.onrender.com');

const LiveChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const handleConnect = () => {
      console.log('✅ Connected with socket ID:', socket.id);
      socket.emit('register', { role: 'user' });
    };

    const handleMessage = (data) => {
      if (data.from === 'user') return; // Don't show user's own messages twice

      setMessages((prev) => [
        ...prev,
        {
          text: data.message,
          sender: 'admin',
          timestamp: data.timestamp || new Date().toISOString()
        }
      ]);
    };

    socket.on('connect', handleConnect);
    socket.on('message_received', handleMessage);

    return () => {
      socket.off('connect', handleConnect);
      socket.off('message_received', handleMessage);
    };
  }, []);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          text: "Hi there! Welcome to Pets Adoption. Ask us anything 🐾",
          sender: 'bot',
          timestamp: new Date().toISOString()
        }
      ]);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;

    if (!socket.id) {
      console.warn('⚠️ Socket not ready yet.');
      return;
    }

    const messageData = {
      message: input,
      from: 'user'
    };

    socket.emit('send_message', messageData);

    setMessages((prev) => [
      ...prev,
      { text: input, sender: 'user', timestamp: new Date().toISOString() }
    ]);
    setInput('');
  };

  const formatTimestamp = (timestamp) => {
    const time = new Date(timestamp);
    return time.toLocaleTimeString();
  };

  return (
    <div className="live-chat-container">
      <div className="chat-icon" onClick={() => setIsOpen(!isOpen)}>
        <FaCommentDots size={24} />
      </div>

      {isOpen && (
        <div className="live-chat-widget">
          <h2>Live Chat</h2>
          <div className="messages">
            {messages.map((msg, i) => (
              <div key={i} className={msg.sender === 'user' ? 'user' : 'bot'}>
                {msg.sender !== 'user' && (
                  <div className="message-header">
                    <span className="sender-label">
                      {msg.sender === 'bot' ? 'Support Bot' : 'Admin'}
                    </span>
                    <small>{formatTimestamp(msg.timestamp)}</small>
                  </div>
                )}
                <span>{msg.text}</span>
                {msg.sender === 'user' && (
                  <small>{formatTimestamp(msg.timestamp)}</small>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type a message..."
            disabled={!socket.id}
          />
          <button onClick={sendMessage} disabled={!socket.id || !input.trim()}>
            Send
          </button>
        </div>
      )}
    </div>
  );
};

export default LiveChat;
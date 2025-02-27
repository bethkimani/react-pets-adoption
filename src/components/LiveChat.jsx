import { useState } from 'react';
import { FaCommentDots } from 'react-icons/fa'; // Import a chat icon from react-icons

const LiveChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false); // State to manage chat visibility

  const sendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: 'user' }]);
      setInput('');
    }
  };

  return (
    <div className="live-chat-container">
      {/* Chat Icon */}
      <div className="chat-icon" onClick={() => setIsOpen(!isOpen)}>
        <FaCommentDots size={24} /> {/* Chat icon */}
      </div>

      {/* Chat Widget (Conditionally Rendered) */}
      {isOpen && (
        <div className="live-chat-widget">
          <h2>Live Chat</h2>
          <div className="messages">
            {messages.map((msg, index) => (
              <div key={index} className={msg.sender === 'user' ? 'user' : 'bot'}>
                {msg.text}
              </div>
            ))}
          </div>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      )}
    </div>
  );
};

export default LiveChat;
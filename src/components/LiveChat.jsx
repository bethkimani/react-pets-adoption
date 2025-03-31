import { useState, useEffect } from 'react';
import { FaCommentDots } from 'react-icons/fa';
import io from 'socket.io-client';
import { getChatMessages } from '../api'; // Import the API function to fetch chat history
import './LiveChat.css'; // Import the CSS file for styling

// Initialize Socket.IO client
const socket = io(import.meta.env.VITE_SOCKET_URL || 'http://127.0.0.1:5000', {
    withCredentials: true,
    extraHeaders: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Send JWT token
    },
});

const LiveChat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    // Set up WebSocket listeners
    useEffect(() => {
        // Connect to WebSocket
        socket.on('connect', () => {
            console.log('Connected to WebSocket');
        });

        // Listen for new messages (including the welcome message)
        socket.on('new_message', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        // Handle errors
        socket.on('error', (error) => {
            console.error('WebSocket error:', error);
        });

        // Clean up on component unmount
        return () => {
            socket.off('connect');
            socket.off('new_message');
            socket.off('error');
        };
    }, []);

    // Fetch chat history when the chat widget is opened
    useEffect(() => {
        if (isOpen) {
            const fetchChatHistory = async () => {
                try {
                    const response = await getChatMessages();
                    // Combine fetched messages with any existing messages (e.g., welcome message)
                    setMessages((prevMessages) => [...prevMessages, ...response.data]);
                } catch (error) {
                    console.error('Error fetching chat history:', error);
                }
            };

            fetchChatHistory();
        }
    }, [isOpen]);

    const sendMessage = () => {
        if (input.trim()) {
            // Send message to the backend via WebSocket
            socket.emit('new_message', { text: input });
            setInput('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

    return (
        <div className="live-chat-container">
            {/* Chat Icon */}
            <div className="chat-icon" onClick={() => setIsOpen(!isOpen)}>
                <FaCommentDots size={24} />
            </div>

            {/* Chat Widget (Conditionally Rendered) */}
            {isOpen && (
                <div className="live-chat-widget">
                    <h2>Live Chat</h2>
                    <div className="messages">
                        {messages.map((msg, index) => (
                            <div key={index} className={msg.sender === 'user' ? 'user' : 'bot'}>
                                <span>{msg.text}</span>
                                <small>{new Date(msg.timestamp).toLocaleTimeString()}</small>
                            </div>
                        ))}
                    </div>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type a message..."
                    />
                    <button onClick={sendMessage}>Send</button>
                </div>
            )}
        </div>
    );
};

export default LiveChat;
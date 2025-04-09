import { useState, useEffect } from 'react';
import { FaCommentDots } from 'react-icons/fa';
import io from 'socket.io-client';
import { getChatMessages } from '../api'; // Import the API function to fetch chat history
import './LiveChat.css'; // Import the CSS file for styling

// Initialize Socket.IO client
const socket = io(import.meta.env.VITE_SOCKET_URL || 'https://pets-adoption-flask-sqlite.onrender.com', {
    withCredentials: true,
    auth: {
        token: localStorage.getItem('token'), // Send JWT token via auth
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
            // Fetch chat history immediately upon connection if chat is open
            if (isOpen) {
                fetchChatHistory();
            }
        });

        // Listen for connection errors
        socket.on('connect_error', (error) => {
            console.error('WebSocket connection error:', error);
        });

        // Listen for new messages (including bot responses)
        socket.on('new_message', (message) => {
            console.log('Received new message:', message);
            setMessages((prevMessages) => {
                // Avoid duplicate messages by checking if the message already exists
                const messageExists = prevMessages.some(
                    (msg) => msg.text === message.text && msg.timestamp === message.timestamp
                );
                if (!messageExists) {
                    return [...prevMessages, message];
                }
                return prevMessages;
            });
        });

        // Handle errors
        socket.on('error', (error) => {
            console.error('WebSocket error:', error);
        });

        // Clean up on component unmount
        return () => {
            socket.off('connect');
            socket.off('connect_error');
            socket.off('new_message');
            socket.off('error');
        };
    }, [isOpen]); // Add isOpen as a dependency to re-run when chat opens/closes

    // Fetch chat history when the chat widget is opened
    const fetchChatHistory = async () => {
        try {
            const response = await getChatMessages();
            console.log('Fetched chat history:', response.data);
            // Filter out test messages, but ensure welcome message isn't filtered
            const filteredMessages = response.data.filter(
                (msg) => !msg.text.toLowerCase().includes('test')
            );
            setMessages(filteredMessages);

            // If no messages exist, emit a welcome message
            if (filteredMessages.length === 0) {
                const welcomeMessage = {
                    text: "Hello! Welcome to Pets Adoption, your trusted platform for finding the perfect furry friend. We offer a wide range of pets ready for adoption. How can I assist you today? For more information, contact us at 401-234-5678.",
                    sender: 'bot',
                    timestamp: new Date().toISOString(),
                };
                socket.emit('new_message', welcomeMessage);
            }
        } catch (error) {
            console.error('Error fetching chat history:', error);
        }
    };

    // Fetch chat history when the chat widget is opened
    useEffect(() => {
        if (isOpen) {
            fetchChatHistory();
        }
    }, [isOpen]);

    const sendMessage = () => {
        if (input.trim()) {
            console.log('Sending message:', input);
            const userMessage = {
                text: input,
                sender: 'user',
                timestamp: new Date().toISOString(),
            };
            // Send message to the backend via WebSocket
            socket.emit('new_message', userMessage);
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
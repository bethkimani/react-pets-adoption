import React, { useState } from 'react';
import './Inbox.css';

const Inbox = () => {
    const [messages, setMessages] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newMessage = {
            id: messages.length + 1,
            name,
            email,
            message,
        };
        setMessages([...messages, newMessage]);
        setName('');
        setEmail('');
        setMessage('');
    };

    return (
        <div className="inbox-container">
            <h2>Inbox</h2>
            <div className="messages-list">
                {messages.length === 0 ? (
                    <p>No messages yet.</p>
                ) : (
                    messages.map((msg) => (
                        <div key={msg.id} className="message">
                            <h4>{msg.name} ({msg.email})</h4>
                            <p>{msg.message}</p>
                        </div>
                    ))
                )}
            </div>
            <h3>Send a Message</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="user-name">Your Name:</label>
                <input
                    type="text"
                    id="user-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <label htmlFor="user-email">Your Email:</label>
                <input
                    type="email"
                    id="user-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label htmlFor="user-message">Message:</label>
                <textarea
                    id="user-message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows="5"
                    required
                />

                <button type="submit">Send Message</button>
            </form>
        </div>
    );
};

export default Inbox;
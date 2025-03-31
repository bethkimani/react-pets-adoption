// ViewFeedback.jsx
import React, { useEffect, useState } from 'react';
import './ViewFeedback.css';
import { getMessages } from '../api';

const ViewFeedback = () => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await getMessages();
        setMessages(response.data || response);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to load messages');
      }
    };
    fetchMessages();
  }, []);

  return (
    <div className="view-feedback">
      <h2>Messages</h2>
      {error && <p className="error">{error}</p>}
      {messages.length === 0 && !error ? (
        <p>No messages available.</p>
      ) : (
        <ul className="feedback-list">
          {messages.map((msg) => (
            <li key={msg.id} className="feedback-item">
              <strong>{msg.name} ({msg.email}):</strong> {msg.text}
              <br />
              <small>{new Date(msg.timestamp).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewFeedback;
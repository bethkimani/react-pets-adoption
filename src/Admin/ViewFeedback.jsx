// ViewFeedback.js
import React, { useEffect, useState } from 'react';
import './ViewFeedback.css';
import { getMessages, replyToMessage, likeMessage } from '../api';

const ViewFeedback = () => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');
  const [replyText, setReplyText] = useState({});

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await getMessages();
      setMessages(response.data || response);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load messages');
    }
  };

  const handleReply = async (messageId) => {
    try {
      const text = replyText[messageId];
      if (!text) return;
      await replyToMessage(messageId, { text });
      setReplyText({ ...replyText, [messageId]: '' });
      fetchMessages(); // Refresh messages
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to reply');
    }
  };

  const handleLike = async (messageId) => {
    try {
      await likeMessage(messageId);
      fetchMessages(); // Refresh messages
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to like');
    }
  };

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
              <strong>{msg.email}:</strong> {msg.text}
              <br />
              <small>{new Date(msg.timestamp).toLocaleString()}</small>
              <div className="actions">
                <button onClick={() => handleLike(msg.id)}>
                  Like ({msg.likes})
                </button>
                <textarea
                  value={replyText[msg.id] || ''}
                  onChange={(e) =>
                    setReplyText({ ...replyText, [msg.id]: e.target.value })
                  }
                  placeholder="Type your reply..."
                  rows="2"
                />
                <button onClick={() => handleReply(msg.id)}>Reply</button>
              </div>
              {msg.replies.length > 0 && (
                <ul className="reply-list">
                  {msg.replies.map((reply) => (
                    <li key={reply.id} className="reply-item">
                      <strong>{reply.email} ({reply.sender}):</strong> {reply.text}
                      <br />
                      <small>{new Date(reply.timestamp).toLocaleString()}</small>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewFeedback;
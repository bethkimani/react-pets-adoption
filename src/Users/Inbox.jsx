// Inbox.js
import React, { useState, useEffect } from 'react';
import './Inbox.css';
import { sendMessage, getUserMessages, userLikeMessage, userReplyToMessage } from '../api';

const Inbox = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [messages, setMessages] = useState([]);
  const [replyText, setReplyText] = useState({});
  const [likedMessages, setLikedMessages] = useState(new Set());

  useEffect(() => {
    if (email) {
      fetchUserMessages();
    }
  }, [email]);

  const fetchUserMessages = async () => {
    try {
      const response = await getUserMessages(email);
      setMessages(response.data || response);
    } catch (error) {
      setStatus(`Error: ${error.response?.data?.error || 'Failed to load messages'}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const messageData = { email, message };
      await sendMessage(messageData);
      setStatus('Message sent successfully!');
      setMessage('');
      fetchUserMessages();
    } catch (error) {
      setStatus(`Error: ${error.response?.data?.error || 'Failed to send message'}`);
    }
  };

  const handleLike = async (messageId) => {
    try {
      await userLikeMessage(messageId);
      setLikedMessages((prev) => new Set(prev).add(messageId));
      fetchUserMessages();
    } catch (error) {
      setStatus(`Error: ${error.response?.data?.error || 'Failed to like'}`);
    }
  };

  const handleReply = async (messageId) => {
    try {
      const text = replyText[messageId];
      if (!text) return;
      await userReplyToMessage(messageId, { email, text });
      setReplyText({ ...replyText, [messageId]: '' });
      fetchUserMessages();
    } catch (error) {
      setStatus(`Error: ${error.response?.data?.error || 'Failed to reply'}`);
    }
  };

  return (
    <div className="inbox-container">
      <h1>Inbox</h1>
      <h2>Send a Message</h2>
      {status && <p className={status.includes('Error') ? 'error' : 'success'}>{status}</p>}
      <form onSubmit={handleSubmit}>
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

      <h2>Your Messages</h2>
      {messages.length === 0 ? (
        <p>No messages yet.</p>
      ) : (
        <ul className="message-list">
          {messages.map((msg) => (
            <li key={msg.id} className={`message-item ${msg.sender}`}>
              <strong>{msg.email} ({msg.sender}):</strong> {msg.text}
              <br />
              <small>{new Date(msg.timestamp).toLocaleString()}</small>
              <div className="actions">
                <button onClick={() => handleLike(msg.id)} className="like-button">
                  {likedMessages.has(msg.id) ? '💖' : '❤️'} ({msg.likes})
                </button>
                <textarea
                  value={replyText[msg.id] || ''}
                  onChange={(e) =>
                    setReplyText({ ...replyText, [msg.id]: e.target.value })
                  }
                  placeholder="Type your reply..."
                  rows="2"
                  className="reply-textarea"
                />
                <button onClick={() => handleReply(msg.id)} className="reply-button">
                  💬 Reply
                </button>
              </div>
              {msg.replies.length > 0 && (
                <ul className="reply-list">
                  {msg.replies.map((reply) => (
                    <li key={reply.id} className={`reply-item ${reply.sender}`}>
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

export default Inbox;
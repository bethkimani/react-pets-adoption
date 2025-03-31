import React, { useState } from 'react';
import './Inbox.css';
import { sendMessage } from '../api';

const Inbox = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const messageData = { email, message };
      await sendMessage(messageData);
      setStatus('Message sent successfully!');
      setEmail('');
      setMessage('');
    } catch (error) {
      setStatus(`Error: ${error.response?.data?.error || 'Failed to send message'}`);
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
    </div>
  );
};

export default Inbox;
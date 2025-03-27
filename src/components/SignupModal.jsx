import React, { useState } from 'react';
import { signup } from '../api';
import './Auth.css';

const SignupModal = ({ onClose }) => {
  const [name, setName] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role_id, setRoleId] = useState('1'); // Default to User

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await signup({
        name,
        phone_number,
        email,
        password,
        role_id
      });
      console.log('Signup response:', response.data);
      alert('Signup successful! Please log in.');
      setName('');
      setPhoneNumber('');
      setEmail('');
      setPassword('');
      setRoleId('1');
      onClose();
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Signup failed';
      console.error('Signup error:', errorMessage);
      alert(errorMessage);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>X</button>
        <h2>Sign Up</h2>
        <form onSubmit={handleSignup}>
          <input
            type="text"
            id="signup-name"
            name="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="tel"
            id="signup-phone"
            name="phone_number"
            placeholder="Phone Number"
            value={phone_number}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
          <input
            type="email"
            id="signup-email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            id="signup-password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <select
            id="signup-role"
            name="role_id"
            value={role_id}
            onChange={(e) => setRoleId(e.target.value)}
            required
          >
            <option value="1">User</option>
            <option value="2">Admin</option>
          </select>
          <div className="form-actions">
            <button type="submit" className="submit-button">Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupModal;
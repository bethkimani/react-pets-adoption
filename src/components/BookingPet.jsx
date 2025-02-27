import React, { useState } from 'react';

const BookingModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    petName: '',
    date: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form fields
    if (!formData.name || !formData.email || !formData.petName || !formData.date) {
      alert('Please fill in all fields.');
      return;
    }
    // Simulate form submission
    console.log('Booking Details:', formData);
    alert('Thank you for booking! Please log in to complete your session.');
    onClose(); // Close the modal after submission
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        <h2 className="text-2xl font-bold mb-4">Book a Pet</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="petName">Pet Name</label>
            <input
              type="text"
              id="petName"
              name="petName"
              value={formData.petName}
              onChange={handleChange}
              placeholder="Enter the pet's name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">Booking Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="submit-button">Submit Booking</button>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
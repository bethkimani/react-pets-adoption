import React, { useState } from 'react';
import './SchedulePickup.css';
import { schedulePickup } from '../api'; // Ensure you add this import

const SchedulePickup = ({ onScheduleSubmit }) => {
  const [pickupData, setPickupData] = useState({
    date: '',
    time: '',
    location: 'Shelter World Main Branch',
    additionalNotes: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPickupData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!pickupData.date) {
      setError('Please select a pickup date.');
      return;
    }
    if (!pickupData.time) {
      setError('Please select a pickup time.');
      return;
    }

    try {
      await schedulePickup(pickupData); // Call the API to schedule pickup
      setSuccess('Pickup scheduled successfully!');
      setPickupData({
        date: '',
        time: '',
        location: 'Shelter World Main Branch',
        additionalNotes: '',
      });
      if (onScheduleSubmit) {
        onScheduleSubmit();
      }
    } catch (err) {
      setError('There was an error scheduling your pickup. Please try again.');
    }
  };

  return (
    <div className="schedule-pickup">
      <h1>Schedule Pet Pick-Up</h1>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="date">Pick-Up Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={pickupData.date}
            onChange={handleChange}
            min={new Date().toISOString().split('T')[0]}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="time">Pick-Up Time:</label>
          <select
            id="time"
            name="time"
            value={pickupData.time}
            onChange={handleChange}
            required
          >
            <option value="">Select a time</option>
            <option value="09:00 AM">09:00 AM</option>
            <option value="10:00 AM">10:00 AM</option>
            <option value="11:00 AM">11:00 AM</option>
            <option value="01:00 PM">01:00 PM</option>
            <option value="02:00 PM">02:00 PM</option>
            <option value="03:00 PM">03:00 PM</option>
            <option value="04:00 PM">04:00 PM</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="location">Pick-Up Location:</label>
          <select
            id="location"
            name="location"
            value={pickupData.location}
            onChange={handleChange}
            required
          >
            <option value="Shelter World Main Branch">Shelter World Main Branch</option>
            <option value="Shelter World Downtown">Shelter World Downtown</option>
            <option value="Shelter World Eastside">Shelter World Eastside</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="additionalNotes">Additional Notes:</label>
          <textarea
            id="additionalNotes"
            name="additionalNotes"
            value={pickupData.additionalNotes}
            onChange={handleChange}
            placeholder="Any special instructions or requests?"
          />
        </div>

        <button type="submit">Schedule Pick-Up</button>
      </form>
    </div>
  );
};

export default SchedulePickup;
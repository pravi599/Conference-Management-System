import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddConference.css';

const AddConference = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    date: new Date().toISOString().split('T')[0], // Default to current date
    username: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setFormData({ ...formData, username: storedUsername });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.location || !formData.date) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      await axios.post('https://localhost:7209/api/Conference', formData);
      setMessage('Conference added successfully!');
      setError('');
      // Clear form after successful submission
      setFormData({
        title: '',
        description: '',
        location: '',
        date: new Date().toISOString().split('T')[0],
        username: formData.username
      });
    } catch (error) {
      setMessage('');
      setError('Error adding conference: ' + error.message);
    }
  };

  return (
    <div className="add-conference-container">
      <h2>Add New Conference</h2>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} required />

        <label>Description:</label>
        <input type="text" name="description" value={formData.description} onChange={handleChange} required />

        <label>Location:</label>
        <input type="text" name="location" value={formData.location} onChange={handleChange} required />

        <label>Date:</label>
        <input type="datetime-local" name="date" value={formData.date} onChange={handleChange} required />

        <label>Username:</label>
        <input type="text" name="username" value={formData.username} onChange={handleChange} required disabled />

        <button type="submit">Add Conference</button>
      </form>
    </div>
  );
};

export default AddConference;

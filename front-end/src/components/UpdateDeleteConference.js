import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UpdateDelete.css';
import './Conferences.css';

const UpdateDelete = ({ conferenceID }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchConference = async () => {
      try {
        const response = await axios.get(`https://localhost:7209/api/Conference/${conferenceID}`);
        const conference = response.data;
        setTitle(conference.title);
        setDescription(conference.description);
        setLocation(conference.location)
        setDate(new Date(conference.date).toISOString().split('T')[0]);
      } catch (error) {
        console.error('Error fetching conference:', error);
      }
    };

    fetchConference();
  }, [conferenceID]);

  const handleUpdate = async () => {
    if (!title || !description || !location || !date) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      const response = await axios.get(`https://localhost:7209/api/Conference/${conferenceID}`);
      const conference = response.data;

      await axios.put(`https://localhost:7209/api/Conference/${conferenceID}`, {
        ...conference,
        title,
        description,
        location,
        date
      });
      alert('Conference updated successfully!');
      window.location.reload();
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating conference:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`https://localhost:7209/api/Conference/${conferenceID}`);
      alert('Conference deleted successfully!');
      window.location.reload();
    } catch (error) {
      console.error('Error deleting conference:', error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className={`update-delete-container ${isEditing ? 'editing' : ''}`}>
      {isEditing ? (
        <div>
          {error && <p className="error-message">{error}</p>}
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />

          <label>Description:</label>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />

          <label>Location:</label>
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />

          <label>Date:</label>
          <input type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} required />

          <button className="update-button" onClick={handleUpdate}>Update</button>
          <button className="edit-button" onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <div>
          {message && <p className="success-message">{message}</p>}
          <button className="edit-button" onClick={() => setIsEditing(true)}>Edit</button>
          <button className="delete-button" onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default UpdateDelete;

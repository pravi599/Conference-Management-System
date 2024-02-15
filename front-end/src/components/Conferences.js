import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UpdateDelete from './UpdateDeleteConference'; 
import './Conferences.css';

const Conferences = () => {
  const [conferences, setConferences] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchConferences = async () => {
      try {
        const response = await axios.get('https://localhost:7209/api/Conference');
        setConferences(response.data);
      } catch (error) {
        console.error('Error fetching conferences:', error);
      }
    };

    fetchConferences();
  }, []);

  useEffect(() => {
    const results = conferences.filter(conference =>
      conference.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conference.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm, conferences]);

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="conferences-container">
      <h2>All Conferences</h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by title or location"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className="conferences-list">
        {searchResults.map((conference) => (
          <div key={conference.conferenceID} className="conference-card">
            <h3>{conference.title}</h3>
            <p><strong>Description:</strong> {conference.description}</p>
            <p><strong>Location:</strong> {conference.location}</p>
            <p><strong>Date:</strong> {new Date(conference.date).toLocaleString()}</p>
            <UpdateDelete conferenceID={conference.conferenceID} /> 
          </div>
        ))}
      </div>
    </div>
  );
};

export default Conferences;
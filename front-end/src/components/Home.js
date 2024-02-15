// Home.js

import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <header>
        <h1>Welcome to Conference Central</h1>
        <p>Your one-stop platform for managing conferences</p>
      </header>
      <main>
        <section className="features">
          <div className="feature-item">
            <h2>Event Management</h2>
            <p>Efficiently organize and manage conferences, workshops, and seminars.</p>
          </div>
          <div className="feature-item">
            <h2>Speaker Engagement</h2>
            <p>Connect with speakers, manage their profiles, and coordinate sessions.</p>
          </div>
          <div className="feature-item">
            <h2>Attendee Registration</h2>
            <p>Streamline the registration process for attendees and manage ticket sales.</p>
          </div>
          <div className="feature-item">
            <h2>Schedule Planning</h2>
            <p>Create and customize event schedules, sessions, and tracks.</p>
          </div>
        </section>
      </main>
      <footer>
        <p>&copy; 2024 Conference Central. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default Home;

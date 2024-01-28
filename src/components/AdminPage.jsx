// AdminPage.jsx
import React, { useState, useEffect } from 'react';
import EventForm from './EventForm';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/events');
      if (response.ok) {
        const data = await response.json();
        setEvents(data);
      } else {
        console.error('Failed to fetch events:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleUpdate = (eventId) => {
    // Use navigate to go to the update page with the eventId
    navigate(`/update/${eventId}`);
  };

  const handleDelete = async (eventId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/events/${eventId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Event deleted successfully');
        // Update the events list after deletion
        fetchData();
      } else {
        console.error('Failed to delete event. Server responded with:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div style={{ padding: '4rem' }}>
      <h1>Welcome Admin!!!</h1>
      <EventForm fetchData={fetchData} />

      <br></br>

      <h2>Displayed Events</h2>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Event Name</th>
            <th scope="col">Event Date</th>
            <th scope="col">Event Description</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event._id}>
              <td>{event.eventName}</td>
              <td>{new Date(event.eventDate).toLocaleDateString()}</td>
              <td>{event.eventDescription}</td>
              <td>
                <button
                  className="btn btn-warning"
                  onClick={() => handleUpdate(event._id)}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger ml-2"
                  onClick={() => handleDelete(event._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;

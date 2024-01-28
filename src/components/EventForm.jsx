import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EventForm = () => {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventImage, setEventImage] = useState(null); // Updated state for the image file
  const [notification, setNotification] = useState('');
  const navigate = useNavigate();

  const handleClick = () => {
    // Navigate to the login route
    navigate('/');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setEventImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!eventImage) {
        setNotification('Please select an image.');
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(eventImage);
      reader.onload = async () => {
        const imageData = reader.result.split(',')[1]; // Get the base64-encoded data

        const response = await fetch('http://localhost:5000/api/events', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            eventName,
            eventDate,
            eventDescription,
            eventImages: imageData,
          }),
        });

        if (response.ok) {
          console.log('Event saved successfully');
          setNotification('Event added successfully!');
          // Add any additional logic or redirect the user as needed
        } else {
          console.error('Failed to save event');
          setNotification('Failed to add event. Please try again.');
        }
      };
    } catch (error) {
      console.error('Error:', error);
      setNotification('Error adding event. Please try again.');
    } finally {
      // Clear notification after 5 seconds
      setTimeout(() => {
        setNotification('');
      }, 5000);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2>Create Event</h2>
        <button className="btn btn-dark" onClick={handleClick}>
          Back to Home Page
        </button>
      </div>
      {notification && (
        <div className="alert alert-info mt-3" role="alert">
          {notification}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Event Name:</label>
          <input
            type="text"
            value={eventName}
            className="form-control"
            onChange={(e) => setEventName(e.target.value)}
          />
        </div>
        <br />

        <div className="form-group">
          <label>Event Date:</label>
          <input
            type="date"
            value={eventDate}
            className="form-control"
            onChange={(e) => setEventDate(e.target.value)}
          />
        </div>
        <br />

        <div className="form-group">
          <label>Event Description:</label>
          <textarea
            value={eventDescription}
            className="form-control"
            onChange={(e) => setEventDescription(e.target.value)}
          />
        </div>
        <br />

        <div className="form-group">
          <label>Event Image:</label>
          <input
            type="file"
            accept="image/*"
            className="form-control"
            onChange={handleFileChange}
          />
        </div>
        <br />

        <button type="submit" className="btn btn-success">
          Add Event
        </button>
      </form>
    </div>
  );
};

export default EventForm;

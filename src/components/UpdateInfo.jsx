import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const UpdateInfo = () => {
  const { eventId } = useParams();
  const [eventData, setEventData] = useState({
    eventName: '',
    eventDate: '',
    eventDescription: '',
    eventImages: '', // This will store the base64-encoded data of the image
  });

  useEffect(() => {
    // Fetch data of the particular event using the eventId
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/events/${eventId}`);
        if (response.ok) {
          const data = await response.json();
          setEventData(data);
        } else {
          console.error('Failed to fetch event data:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, [eventId]);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    // For file input, handle differently
    if (type === 'file') {
      const file = e.target.files[0];
      convertImageToBase64(file);
    } else {
      setEventData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const convertImageToBase64 = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      const imageData = reader.result.split(',')[1]; // Extract base64 data
      setEventData((prevData) => ({
        ...prevData,
        eventImages: imageData,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/events/${eventId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });

      if (response.ok) {
        console.log('Event updated successfully');
        // Handle the update success, e.g., navigate to another page
      } else {
        console.error('Failed to update event. Server responded with:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Update Event Information</h2>
      <form>
        <label>
          Event Name:
          <input
            type="text"
            name="eventName"
            value={eventData.eventName}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Event Date:
          <input
            type="date"
            name="eventDate"
            value={eventData.eventDate}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Event Description:
          <textarea
            name="eventDescription"
            value={eventData.eventDescription}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Event Images URL:
          <input
            type="file"
            name="eventImages"
            accept='image/*'
            className='form-control'
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button type="button" onClick={handleUpdate}>
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateInfo;

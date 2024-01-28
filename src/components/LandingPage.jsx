import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();

  const handleNextButtonClick = () => {
    // Navigate to the login route
    navigate('/login');
  };

  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch data from the server when the component mounts
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

  return (
    <>
      <div className="jumbotron jumbotron-fluid" style={{ display: 'flex' }}>
        <div className="container">
          <h1 className="display-4">E-cell Landing Page</h1>
        </div>
        <div style={{ paddingRight: '2rem' }}>
          <button className="btn btn-dark" onClick={handleNextButtonClick}>
            Admin Login
          </button>
        </div>
      </div>

      <div style={{ paddingLeft: '2rem', paddingRight: '3rem' , border:"1px solid grey",margin:"2rem", borderRadius:"1.5rem", marginBottom:"0rem"}}>
        <h5 style={{color:"grey",fontFamily:"Montserrat, sans-serif",fontWeight:"bold",padding:"1.5rem 0rem 1rem 0rem "}}>HOTTEST EVENTS</h5>
        {events.map((event) => (
            <div key={event._id} style={{ border: '1px #D0D9DA solid', display: "flex",flexWrap:"wrap", justifyContent:"left",borderRadius:"0.7rem" , padding:"1.5rem 1.5rem 1.5rem 1.5rem",marginBottom:"1rem"}}>
                <div >
                    <img
                    src={`data:image/jpeg;base64,${event.eventImages}`}
                    alt={event.eventName}
                    style={{ width: '13.5rem', borderRadius: "0.8rem",}}
                    className="card-img-left"
                    />
                </div>

                <div style={{alignItems:"flex-start",marginBottom:"1rem", marginLeft:"1rem"  }}>
                    <h1 style={{fontWeight:"bold",color:"#273339"}}>{event.eventName}</h1>
                    <p style={{ color: '#8E989C',fontWeight:"bold" }}>Date: {new Date(event.eventDate).toLocaleDateString()}</p>
                    <p className="card-text" style={{ color: '#495B78',fontFamily:"Nunito Sans",fontSize:"20px",lineHeight:"28px" }}>Description: {event.eventDescription}</p>
                </div>
            </div>

        ))}
      </div>
      <br></br>
    </>
  );
}

export default LandingPage;

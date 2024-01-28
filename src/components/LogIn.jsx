// LogIn.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

function LogIn() {
    const navigate = useNavigate();

    const handleClick = () => {
        // Navigate to the login route
        navigate('/admin');
    };

    return (
        <>
            <form style={{ padding: "3rem 3rem 0rem 3rem " }}>
                <div className="form-group">
                    <label>Username:</label>
                    <input type='text' className="form-control" autoComplete="username" />
                </div>

                <div className="form-group">
                    <label>Password:</label>
                    <input type='password' className="form-control" autoComplete="current-password" />
                </div>

                <button type='submit' className='btn btn-info' onClick={handleClick}>Log In</button>
            </form>
            <br />
            <div style={{ padding: "15%" }}></div>
        </>
    );
}

export default LogIn;

// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LogIn from './components/Login';
import AdminPage from './components/AdminPage';
import UpdateInfo from './components/UpdateInfo';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<LogIn />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/update/:eventId" element={<UpdateInfo />} />
      </Routes>
    </Router>
  );
}

export default App;

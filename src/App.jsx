import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Homepage.jsx';
import Login from './Login.jsx';
import Dashboard from './Dashboard.jsx';
import Profile from './pages/student/Profile.jsx';
import Offres from './pages/student/Offres.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/dash" element={<Dashboard />} />
        <Route path='/student/Profile' element={<Profile />} />
        <Route path='/student/Offres' element={<Offres />} />
      </Routes>
    </Router>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Homepage.jsx';
import Login from './Login.jsx';
import Dashboard from './Dashboard.jsx';
import Dasheco from './Dasheco.jsx';
import Profile from './pages/student/Profile.jsx';
import Dashent from './Dashent.jsx';
import Offres from './pages/student/Offres.jsx';
import Postulations from './pages/student/Postulations.jsx';
import Applicants from './pages/entreprise/Applicants.jsx';
import CreateOffer from './pages/entreprise/CreateOffer.jsx';
import CreateInternalAccount from './pages/entreprise/CreateInternalAccount.jsx';
import CreateStudent from './pages/Ecole/CreateStudent.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/dash" element={<Dashboard />} />
        <Route path='/student/Profile' element={<Profile />} />
        <Route path='/student/Offres' element={<Offres />} />
        <Route path='/student/postulations' element={<Postulations />} />
        <Route path='/entreprise' element={<Dashent />} />
        <Route path='/student/Applications' element={<Applicants />} />
        <Route path='/entreprise/create' element={<CreateOffer />} />
        <Route path='/entreprise/interne' element={<CreateInternalAccount />} />
        <Route path='/ecole' element={<Dasheco />} />
        <Route path='/ecole/sign' element={<CreateStudent />} />
        
      </Routes>
    </Router>
  );
}

export default App;

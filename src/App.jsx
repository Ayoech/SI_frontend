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
import Etudiant from './pages/Ecole/Etudiant.jsx';
import Conventions from './pages/Ecole/Conventions.jsx';
import Entreprise from './pages/Ecole/Entreprise.jsx';
import ManageOffers from './pages/entreprise/ManageOffers.jsx';
import Gestionnaire from './pages/entreprise/Gestionnaire.jsx';
import Statistics from './components/ecole/Statistics.jsx';
import Offers from './pages/entreprise/Offers.jsx';
import OfferDetails from './OfferDetails.jsx';
import EntrepriseProfile from './pages/entreprise/EntrepriseProfile.jsx';

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
        <Route path='/entreprise/offres' element={<Offers />} />
        <Route path='/entreprise/interne' element={<CreateInternalAccount />} />
        <Route path='/entreprise/edit' element={<ManageOffers />} />
        <Route path='/ecole' element={<Dasheco />} />
        <Route path='/ecole/etudiants' element={<Etudiant />} />
        <Route path='/ecole/conventions' element={<Conventions />} />
        <Route path='/ecole/entreprises' element={<Entreprise />} />
        <Route path='/entreprise/gestform' element={<Gestionnaire />} />
        <Route path='/ecole/statistics' element={<Statistics />} />
        <Route path="/offer-details/:offerId" element={<OfferDetails />} />
        <Route path='/entreprise/Profile' element={<EntrepriseProfile />} />
        
      </Routes>
    </Router>
  );
}

export default App;

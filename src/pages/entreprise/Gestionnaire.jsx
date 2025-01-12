import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../Header';
import Sideent from '../../Sideent';
import Homy from '../../Homy';
import creerGestionnaireEntreprise from '../../Services/CreerGestionnaire'; // Using the provided function

const Gestionnaire = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(true);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
  });
  const [internalAccounts, setInternalAccounts] = useState([]);
  const [numUtilisateur, setNumUtilisateur] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  // Retrieve user ID from localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('JWT token not found. Please login.');
      return;
    }

    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user && user.userId) {
        setNumUtilisateur(user.userId);
      } else {
        console.error('numUtilisateur not found in user data.');
      }
    } catch (error) {
      console.error('Error decoding user data:', error.message);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!numUtilisateur) {
      setErrorMessage('User ID not found. Please ensure you are logged in.');
      return;
    }


    try {
      const num_utilisateur = numUtilisateur;
      // Use the provided `creerGestionnaireEntreprise` function
      const response = await creerGestionnaireEntreprise({ ...formData, num_utilisateur });
      setInternalAccounts((prevAccounts) => [...prevAccounts, formData]);
      setSuccessMessage('Internal account created successfully!');
      setFormData({ nom: '', prenom: '', email: '' }); // Reset form fields
    } catch (error) {
      console.error('Error creating internal account:', error);
      setErrorMessage('Failed to create internal account. Please try again.');
    }
  };

  return (
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} />
      <Sideent openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      <div
        className={`flex flex-col items-center min-h-screen bg-gray-100 ${
          openSidebarToggle ? 'ml-[52rem]' : 'ml-[16rem]'
        } mt-32`}
      >
        <div className="p-6 ml-56 mt-12 " style={{ width: '500px' }}>
      
          <form onSubmit={handleSubmit} className="mb-6">
            <div className="mb-4">
              <label htmlFor="nom" className="block font-medium">
                Nom
              </label>
              <input
                type="text"
                name="nom"
                id="nom"
                value={formData.nom}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="prenom" className="block font-medium">
                Prénom
              </label>
              <input
                type="text"
                name="prenom"
                id="prenom"
                value={formData.prenom}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block font-medium">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded"
                required
              />
            </div>
            <div className="flex justify-center">
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Create Account
              </button>
            </div>
          </form>

          {successMessage && <p className="text-green-500">{successMessage}</p>}
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}

          
          
        </div>
      </div>
      <Homy />
    </div>
  );
};

export default Gestionnaire;

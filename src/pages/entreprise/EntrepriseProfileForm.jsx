import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EntrepriseProfileForm = ({ profileData }) => {
  const [formData, setFormData] = useState({
    nom: '',
    addresse: '',
    ville: '',
    telephone: ''
  });

  // Initialize form data when profileData is passed
  useEffect(() => {
    if (profileData) {
      setFormData({
        nom: profileData.nom || '',
        addresse: profileData.addresse || '',
        ville: profileData.ville || '',
        telephone: profileData.telephone || ''
      });
    }
  }, [profileData]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle form submit (send data to the backend)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));
    const num_utilisateur = user.userId // Get the user ID from localStorage
    const token = localStorage.getItem('token'); // Authorization token for the request

    try {
      // Send the updated profile data to the backend
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/v1/entreprise/editprofile/${num_utilisateur}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        alert('Profile updated successfully!');
      } else {
        alert('Failed to update profile');
      }
    } catch (error) {
      console.error('Error saving changes:', error);
      alert('Error saving changes');
    }
  };

  return (
    <div className="mt-12 ml-4 p-6 rounded-lg" style={{ width: '400px' }}>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="nom" className="block text-sm font-medium mb-1">
            Nom:
          </label>
          <input
            type="text"
            id="nom"
            name="nom"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={formData.nom}
            onChange={handleChange}
            placeholder="Enter company name"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="addresse" className="block text-sm font-medium mb-1">
            Adresse:
          </label>
          <input
            type="text"
            id="addresse"
            name="addresse"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={formData.addresse}
            onChange={handleChange}
            placeholder="Enter company address"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="ville" className="block text-sm font-medium mb-1">
            Ville:
          </label>
          <input
            type="text"
            id="ville"
            name="ville"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={formData.ville}
            onChange={handleChange}
            placeholder="Enter city"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="telephone" className="block text-sm font-medium mb-1">
            Téléphone:
          </label>
          <input
            type="text"
            id="telephone"
            name="telephone"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={formData.telephone}
            onChange={handleChange}
            placeholder="Enter phone number"
          />
        </div>

        <button type="submit" className="mt-4 ml-24 px-6 py-2 bg-blue-500 text-white rounded">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EntrepriseProfileForm;

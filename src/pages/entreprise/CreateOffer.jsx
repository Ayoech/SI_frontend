import React, { useState, useEffect } from 'react';
import Header from '../../Header';
import Sideent from '../../Sideent';
import axios from 'axios';

const CreateOffer = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(true);
  const [offerData, setOfferData] = useState({
    titre: '',
    description: '',
    date_debut: '',
    date_fin: ''
  });

  const [offers, setOffers] = useState([]);
  const [numUtilisateur, setNumUtilisateur] = useState(null);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  // Function to get offers
  const fetchOffers = async () => {
    try {
      const token = localStorage.getItem('jwt'); // Assuming JWT is stored in localStorage
      const response = await axios.get('http://localhost:3000/api/v1/entreprise/offers', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setOffers(response.data); // Assuming response contains list of offers
    } catch (error) {
      console.error('Error fetching offers:', error);
    }
  };

  // Fetch offers and extract num_utilisateur from JWT when the component mounts
  useEffect(() => {
    fetchOffers();

    // Decode the JWT to extract num_utilisateur (assuming the token includes it)
    const token = localStorage.getItem('jwt');
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode JWT
      setNumUtilisateur(decodedToken.num_utilisateur); // Extract num_utilisateur from the token
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOfferData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('jwt'); // Get JWT token from localStorage
      const response = await axios.post(
        'http://localhost:3000/api/v1/entreprise/offers',
        { ...offerData, num_utilisateur: numUtilisateur }, // Include num_utilisateur in the request
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log('Offer created successfully:', response.data);
    } catch (error) {
      console.error('Error creating offer:', error.message);
    }
  };

  return (
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} />
      <Sideent openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      <div className={`flex justify-center items-start ${openSidebarToggle ? 'ml-[56rem] mt-[4rem] pt-[0.1rem]' : 'ml-[16rem]'}`}>
        <div className="rounded-lg p-24 max-w-6xl">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="titre" className="block font-medium" style={{ width: '200px' }}>Titre</label>
              <input
                type="text"
                name="titre"
                id="titre"
                value={offerData.titre}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded"
                style={{ width: '400px' }}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block font-medium" style={{ width: '200px' }}>Description</label>
              <input
                type="text"
                name="description"
                id="description"
                value={offerData.description}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded"
                style={{ width: '400px' }}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="date_debut" className="block font-medium" style={{ width: '200px' }}>Start Date</label>
              <input
                type="date"
                name="date_debut"
                id="date_debut"
                value={offerData.date_debut}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded"
                style={{ width: '400px' }}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="date_fin" className="block font-medium" style={{ width: '200px' }}>End Date</label>
              <input
                type="date"
                name="date_fin"
                id="date_fin"
                value={offerData.date_fin}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded"
                style={{ width: '400px' }}
              />
            </div>

            <div className="flex justify-center mt-12" style={{ width: '400px' }}>
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Create Offer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateOffer;

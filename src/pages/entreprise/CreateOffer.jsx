import React, { useState, useEffect } from 'react';
import Header from '../../Header';
import Sideent from '../../Sideent';
import CreateOffre from  '../../Services/CreateOffre' // Import the CreateOffre function

const CreateOffer = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(true);
  const [offerData, setOfferData] = useState({
    titre: '',
    description: '',
    date_debut: '',
    date_fin: '',
  });
  const [numUtilisateur, setNumUtilisateur] = useState(null);
  const [errorMessage, setErrorMessage] = useState(''); // To store error message
  const [successMessage, setSuccessMessage] = useState(''); // To store success message

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  // Function to extract the user number from the JWT token
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('JWT token not found. Please login.');
      // Optional: Redirect to login page
      return;
    }

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user && user.userId) {
        setNumUtilisateur(user.userId);
      } else {
        console.error('num_utilisateur not found in token.');
      }c
    } catch (error) {
      console.error('Error decoding token:', error.message);
    }
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setOfferData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous error messages
    setSuccessMessage(''); // Clear previous success messages

    try {
      const response = await CreateOffre(offerData);

      // If the offer was successfully created
      setSuccessMessage('Offer created successfully!');
      setOfferData({
        titre: '',
        description: '',
        date_debut: '',
        date_fin: '',
      }); // Reset form fields
    } catch (error) {
      setErrorMessage('Failed to create offer. Please try again later.');
    }
  };

  return (
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} />
      <Sideent openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      <div
        className={`flex justify-center items-start ${
          openSidebarToggle ? 'ml-[56rem] mt-[4rem] pt-[0.1rem]' : 'ml-[16rem]'
        }`}
      >
        <div className="rounded-lg p-24 max-w-6xl">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="titre" className="block font-medium" style={{ width: '200px' }}>
                Titre
              </label>
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
              <label htmlFor="description" className="block font-medium" style={{ width: '200px' }}>
                Description
              </label>
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
              <label htmlFor="date_debut" className="block font-medium" style={{ width: '200px' }}>
                Start Date
              </label>
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
              <label htmlFor="date_fin" className="block font-medium" style={{ width: '200px' }}>
                End Date
              </label>
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

          {/* Display success or error message */}
          {successMessage && (
            <div className="mt-4 text-green-500">
              <p>{successMessage}</p>
            </div>
          )}

          {errorMessage && (
            <div className="mt-4 text-red-500">
              <p>{errorMessage}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateOffer;

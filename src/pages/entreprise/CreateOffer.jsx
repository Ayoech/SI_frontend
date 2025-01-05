import React, { useState } from 'react';
import axios from 'axios';
import Header from '../../Header';
import Sideent from '../../Sideent';

const CreateOffer = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(true);
  const [offerData, setOfferData] = useState({
    description: '',
    domaine: '',
    date_debut: '',
    date_fin: '',
    num_entreprise: '',
    num_professeur: '',
    num_tuteur: ''
  });

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

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
      const response = await axios.post('/api/offers', offerData);
      alert(response.data.message || 'Offer created successfully');
    } catch (error) {
      console.error('Error creating offer:', error.message);
      alert('Error creating offer.');
    }
  };

  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar} />
      <Sideent openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      <div className={`flex justify-center items-start min-h-screen bg-gray-100 ${openSidebarToggle ? 'ml-[36rem]' : 'ml-[16rem]'}`}>
        <div className='bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl'>
          <form onSubmit={handleSubmit}>
            <div className='mb-4'>
              <label htmlFor='description' className='block font-medium'>Description</label>
              <input
                type='text'
                name='description'
                id='description'
                value={offerData.description}
                onChange={handleChange}
                className='mt-1 p-2 w-full border border-gray-300 rounded'
              />
            </div>
            <div className='mb-4'>
              <label htmlFor='domaine' className='block font-medium'>Domaine</label>
              <input
                type='text'
                name='domaine'
                id='domaine'
                value={offerData.domaine}
                onChange={handleChange}
                className='mt-1 p-2 w-full border border-gray-300 rounded'
              />
            </div>
            <div className='mb-4'>
              <label htmlFor='date_debut' className='block font-medium'>Start Date</label>
              <input
                type='date'
                name='date_debut'
                id='date_debut'
                value={offerData.date_debut}
                onChange={handleChange}
                className='mt-1 p-2 w-full border border-gray-300 rounded'
              />
            </div>
            <div className='mb-4'>
              <label htmlFor='date_fin' className='block font-medium'>End Date</label>
              <input
                type='date'
                name='date_fin'
                id='date_fin'
                value={offerData.date_fin}
                onChange={handleChange}
                className='mt-1 p-2 w-full border border-gray-300 rounded'
              />
            </div>
            <div className='mb-4'>
              <label htmlFor='num_entreprise' className='block font-medium'>Company Number</label>
              <input
                type='text'
                name='num_entreprise'
                id='num_entreprise'
                value={offerData.num_entreprise}
                onChange={handleChange}
                className='mt-1 p-2 w-full border border-gray-300 rounded'
              />
            </div>
            <div className='mb-4'>
              <label htmlFor='num_professeur' className='block font-medium'>Professor Number</label>
              <input
                type='text'
                name='num_professeur'
                id='num_professeur'
                value={offerData.num_professeur}
                onChange={handleChange}
                className='mt-1 p-2 w-full border border-gray-300 rounded'
              />
            </div>
            <div className='mb-4'>
              <label htmlFor='num_tuteur' className='block font-medium'>Supervisor Number</label>
              <input
                type='text'
                name='num_tuteur'
                id='num_tuteur'
                value={offerData.num_tuteur}
                onChange={handleChange}
                className='mt-1 p-2 w-full border border-gray-300 rounded'
              />
            </div>
            <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>
              Create Offer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateOffer;

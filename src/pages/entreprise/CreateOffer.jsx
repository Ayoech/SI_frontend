import React, { useState } from 'react';
import axios from 'axios';
import Header from '../../Header';
import Sideent from '../../Sideent';
import CreateOffre from '../../Services/CreateOffre';

const CreateOffer = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(true);
  const [offerData, setOfferData] = useState({
    titre:'',
    description: '',
    date_debut: '',
    date_fin: ''
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
      const response = await CreateOffre(offerData);
      console.log('response: ', response.message)
    } catch (error) {
      console.error('Error creating offer:', error.message);
    }
  };

  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar} />
      <Sideent openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      <div className={`flex justify-center items-start   ${openSidebarToggle ? 'ml-[56rem] mt-[4rem] pt-[0.1rem]' : 'ml-[16rem]'}`}>
        <div className=' rounded-lg p-24  max-w-6xl'>
          <form onSubmit={handleSubmit}>
          <div className='mb-4'>
              <label htmlFor='titre' className='block font-medium' style={{width: '200px', paddinTop: '0px'}} >Titre</label>
              <input
                type='text'
                name='titre'
                id='titre'
                value={offerData.titre}
                onChange={handleChange}
                className='mt-1 p-2 w-full border border-gray-300 rounded' style={{width: '400px'}}
              />
            </div>
            <div className='mb-4'>
              <label htmlFor='description' className='block font-medium' style={{width: '200px', paddinTop: '0px'}} >Description</label>
              <input
                type='text'
                name='description'
                id='description'
                value={offerData.description}
                onChange={handleChange}
                className='mt-1 p-2 w-full border border-gray-300 rounded' style={{width: '400px'}}
              />
            </div>
            <div className='mb-4'>
              <label htmlFor='date_debut' className='block font-medium' style={{width: '200px'}}>Start Date</label>
              <input
                type='date'
                name='date_debut'
                id='date_debut'
                value={offerData.date_debut}
                onChange={handleChange}
                className='mt-1 p-2 w-full border border-gray-300 rounded' style={{width: '400px'}}
              />
            </div>
            <div className='mb-4'>
              <label htmlFor='date_fin' className='block font-medium' style={{width: '200px'}}>End Date</label>
              <input
                type='date'
                name='date_fin'
                id='date_fin'
                value={offerData.date_fin}
                onChange={handleChange}
                className='mt-1 p-2 w-full border border-gray-300 rounded' style={{width: '400px'}}
              />
            </div>
            
            <div className="flex justify-center mt-12" style={{width: '400px'}}>
            <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>
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

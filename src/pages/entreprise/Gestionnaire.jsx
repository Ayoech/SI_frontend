import React, { useState } from 'react';
import axios from 'axios';
import Header from '../../Header';
import Sideent from '../../Sideent';

const Gestionnaire = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(true);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
  });

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/internal-accounts', formData);
      alert(response.data.message || 'Account created successfully');
    } catch (error) {
      console.error('Error creating account:', error.message);
      alert('Error creating account.');
    }
  };

  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar} />
      <Sideent openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      <div className={`flex justify-center items-start ${openSidebarToggle ? 'ml-[56rem] mt-[4rem] pt-[0.1rem]' : 'ml-[16rem]'}`}>
        <div className='rounded-lg p-24 max-w-6xl'>
          <form onSubmit={handleSubmit}>
            <div className='mb-4'>
              <label htmlFor='nom' className='block font-medium' style={{ width: '200px' }}>
                Nom
              </label>
              <input
                type='text'
                name='nom'
                id='nom'
                value={formData.nom}
                onChange={handleChange}
                className='mt-1 p-2 w-full border border-gray-300 rounded'
                style={{ width: '400px' }}
                required
              />
            </div>
            <div className='mb-4'>
              <label htmlFor='prenom' className='block font-medium' style={{ width: '200px' }}>
                Prénom
              </label>
              <input
                type='text'
                name='prenom'
                id='prenom'
                value={formData.prenom}
                onChange={handleChange}
                className='mt-1 p-2 w-full border border-gray-300 rounded'
                style={{ width: '400px' }}
                required
              />
            </div>
            <div className='mb-4'>
              <label htmlFor='email' className='block font-medium' style={{ width: '200px' }}>
                Email
              </label>
              <input
                type='email'
                name='email'
                id='email'
                value={formData.email}
                onChange={handleChange}
                className='mt-1 p-2 w-full border border-gray-300 rounded'
                style={{ width: '400px' }}
                required
              />
            </div>
            <div className="flex justify-center mt-12" style={{ width: '400px' }}>
              <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Gestionnaire;

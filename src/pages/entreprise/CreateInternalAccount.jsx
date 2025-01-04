import React, { useState } from 'react';
import Header from '../../Header';
import Sideent from '../../Sideent';
import Homy from '../../Homy';

const CreateInternalAccount = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(true);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    password: '',
    role: '',
    numEntreprise: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Internal account created:', formData);
    setFormData({
      firstName: '',
      lastName: '',
      password: '',
      role: '',
      numEntreprise: '',
    });
  };

  return (
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} />
      <Sideent openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      <div
        className={`flex justify-center items-start min-h-screen bg-gray-100 ${
          openSidebarToggle ? 'ml-[36rem]' : 'ml-[16rem]'
        } mt-32`}
      >
        <div className="" style={{backgroundColor: 'white', width: '1000px', marginLeft: '600px'}}> 
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3"
                required
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
                style={{width: '200px'}}
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3"
                required
              />
            </div>
            <div>
             
            </div>
            <div>
              <label
                htmlFor="numEntreprise"
                className="block text-sm font-medium text-gray-700"
              >
                Num Entreprise
              </label>
              <input
                type="text"
                id="numEntreprise"
                name="numEntreprise"
                value={formData.numEntreprise}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3"
                required
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600"
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
      <Homy />
    </div>
  );
};

export default CreateInternalAccount;

import React, { useState } from 'react';
import Header from '../../Header';
import Sideent from '../../Sideent';
import Homy from '../../Homy';

const CreateOffer = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(true);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const [formData, setFormData] = useState({
    description: '',
    domaine: '',
    date_debut: '',
    date_fin: '',
    etat_offre: 'Ouvert', // Default status
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Offer created:', formData);
    setFormData({
      description: '',
      domaine: '',
      date_debut: '',
      date_fin: '',
      etat_offre: 'Ouvert',
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
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
                style={{width: '200px'}}
              >
                Description
              </label>
              <input
                type="text"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3"
                required
              />
            </div>
            <div>
              <label
                htmlFor="domaine"
                className="block text-sm font-medium text-gray-700"
              >
                Domaine
              </label>
              <input
                type="text"
                id="domaine"
                name="domaine"
                value={formData.domaine}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3"
                required
              />
            </div>
            <div>
              <label
                htmlFor="date_debut"
                className="block text-sm font-medium text-gray-700"
              >
                Start Date
              </label>
              <input
                type="date"
                id="date_debut"
                name="date_debut"
                value={formData.date_debut}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3"
                required
              />
            </div>
            <div>
              <label
                htmlFor="date_fin"
                className="block text-sm font-medium text-gray-700"
              >
                End Date
              </label>
              <input
                type="date"
                id="date_fin"
                name="date_fin"
                value={formData.date_fin}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3"
                required
              />
            </div>
            <div>
              <label
                htmlFor="etat_offre"
                className="block text-sm font-medium text-gray-700"
              >
                Offer Status
              </label>
              <select
                id="etat_offre"
                name="etat_offre"
                value={formData.etat_offre}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3"
                required
              >
                <option value="Ouvert">Ouvert</option>
                <option value="Fermé">Fermé</option>
              </select>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600"
              >
                Create Offer
              </button>
            </div>
          </form>
        </div>
      </div>
      <Homy />
    </div>
  );
};

export default CreateOffer;

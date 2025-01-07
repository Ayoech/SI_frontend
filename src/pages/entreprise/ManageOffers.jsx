import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../Header';
import Sideent from '../../Sideent';

const ManageOffers = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(true);

  // Hardcoded list of offers for testing
  const [offres, setOffres] = useState([
    {
      num_offre: 1,
      description: 'Offer description 1',
      domaine: 'IT',
      date_debut: '2025-01-01',
      date_fin: '2025-02-01',
      etat_offre: 'Active',
    },
    {
      num_offre: 2,
      description: 'Offer description 2',
      domaine: 'Marketing',
      date_debut: '2025-02-01',
      date_fin: '2025-03-01',
      etat_offre: 'Inactive',
    },
    {
      num_offre: 3,
      description: 'Offer description 3',
      domaine: 'Finance',
      date_debut: '2025-03-01',
      date_fin: '2025-04-01',
      etat_offre: 'Active',
    },
  ]);

  // Open or close sidebar
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} />
      <Sideent openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      <div
        className={`flex justify-center items-start   ${openSidebarToggle ? 'ml-[56rem] mt-[4rem] pt-[0.1rem]' : 'ml-[16rem]'}`}
      >
        <div className="rounded-lg p-24 max-w-6xl">
          <h1 className="text-2xl font-semibold mb-4">Liste des Offres</h1>

          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-8 py-2">Numéro de l'offre</th>
                <th className="border border-gray-300 px-8 py-2">Description</th>
                <th className="border border-gray-300 px-8 py-2">Domaine</th>
                <th className="border border-gray-300 px-8 py-2">Date de début</th>
                <th className="border border-gray-300 px-8 py-2">Date de fin</th>
                <th className="border border-gray-300 px-8 py-2">État de l'offre</th>
                <th className="border border-gray-300 px-8a py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {offres.length > 0 ? (
                offres.map((offer, index) => (
                  <tr key={offer.num_offre} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                    <td className="border border-gray-300 px-4 py-2">
                      <Link
                        to={`/offer-details/${offer.num_offre}`}
                        className="text-blue-500 hover:underline"
                      >
                        {offer.num_offre}
                      </Link>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">{offer.description}</td>
                    <td className="border border-gray-300 px-4 py-2">{offer.domaine}</td>
                    <td className="border border-gray-300 px-4 py-2">{offer.date_debut}</td>
                    <td className="border border-gray-300 px-4 py-2">{offer.date_fin}</td>
                    <td className="border border-gray-300 px-4 py-2">{offer.etat_offre}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      >
                        Change Status
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-4">No offers available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageOffers;

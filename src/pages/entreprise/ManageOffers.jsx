import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../Header';
import Sideent from '../../Sideent';
import axios from 'axios';
import ManageOffersService from '../../Services/ManageOffers';

const ManageOffers = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(true);
  const [offres, setOffres] = useState([]);
  const [loading, setLoading] = useState(true);

  // Open or close sidebar
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  useEffect(() => {
    const getOffers = async()=>{
      try{
        const response = await ManageOffersService();
        setOffres(response.data);
        console.log(response.data);
      }catch(error){
        console.error('')
      }finally{
        setLoading(false)
      }
    }
    getOffers();
  }, []);

  return (
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} />
      <Sideent openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      <div
        className={`flex justify-center items-start ${openSidebarToggle ? 'ml-[56rem] mt-[4rem] pt-[0.1rem]' : 'ml-[16rem]'}`}
      >
        <div className="rounded-lg p-24 max-w-6xl">
          <h1 className="text-2xl font-semibold mb-4">Liste des Offres</h1>

          {loading ? (
            <p>Loading...</p>
          ) : (
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
                    <tr key={offer.NUM_OFFRE} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                      <td className="border border-gray-300 px-4 py-2">
                        <Link
                          to={`/offer-details/${offer.NUM_OFFRE}`}
                          className="text-blue-500 hover:underline"
                        >
                          {offer.NUM_OFFRE}
                        </Link>
                      </td>
                      <td className="border border-gray-300 px-4 py-2">{offer.DESCRIPTION}</td>
                      <td className="border border-gray-300 px-4 py-2">{offer.DOMINE}</td>
                      <td className="border border-gray-300 px-4 py-2">{offer.DATE_DEBUT.split("T")[0]}</td>
                      <td className="border border-gray-300 px-4 py-2">{offer.DATE_FIN.split("T")[0]}</td>
                      <td className="border border-gray-300 px-4 py-2">{offer.ETAT_OFFRE}</td>
                      <td className="border border-gray-300 px-4 py-2">
  <button
    onClick={() => {
      axios.put(
        `http://localhost:3000/api/v1/entreprise/editoffer`,
        { offerId: offer.NUM_OFFRE },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      .then(response => {
        alert("Offer status updated");
      })
      .catch(error => {
        alert("Failed to update offer status");
      });
    }}
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
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageOffers;

import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Ensure axios is installed
import Header from '../../Header';
import Sideent from '../../Sideent';
import Homy from '../../Homy';

const ManageOffers = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(true);
  const [offers, setOffers] = useState([]);
  const [statusUpdating, setStatusUpdating] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  // Fetch offers when the component is mounted
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.get('/api/enterprise/offers'); // Adjust the API endpoint accordingly
        setOffers(response.data);
      } catch (error) {
        console.error('Error fetching offers:', error.message);
      }
    };
    fetchOffers();
  }, []);

  const toggleStatus = async (offerId, currentStatus) => {
    try {
      setStatusUpdating(true);
      const newStatus = currentStatus === 'Ouvert' ? 'Ferme' : 'Ouvert';
      const response = await axios.put(`/api/enterprise/offers/${offerId}/status`, { status: newStatus });
      alert(response.data.message || `Status updated to ${newStatus}.`);
      
      // Update the offers list with the new status
      setOffers((prevOffers) =>
        prevOffers.map((offer) =>
          offer.id === offerId ? { ...offer, status: newStatus } : offer
        )
      );
    } catch (error) {
      console.error('Error updating status:', error.message);
      alert('Failed to update the status.');
    } finally {
      setStatusUpdating(false);
    }
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
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl">
          <h2 className="text-2xl font-bold mb-4">Manage Offers</h2>
          <table className="table-auto w-full border-collapse border border-gray-300 text-left">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="border border-gray-300 px-4 py-2">Offer ID</th>
                <th className="border border-gray-300 px-4 py-2">Description</th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {offers.map((offer, index) => (
                <tr
                  key={offer.id}
                  className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
                >
                  <td className="border border-gray-300 px-4 py-2">{offer.id}</td>
                  <td className="border border-gray-300 px-4 py-2">{offer.description}</td>
                  <td className="border border-gray-300 px-4 py-2">{offer.status}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      onClick={() => toggleStatus(offer.id, offer.status)}
                      className={`px-3 py-1 rounded ${
                        offer.status === 'Ouvert'
                          ? 'bg-red-500 hover:bg-red-600'
                          : 'bg-green-500 hover:bg-green-600'
                      } text-white`}
                      disabled={statusUpdating}
                    >
                      {offer.status === 'Ouvert' ? 'Close Offer' : 'Open Offer'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Homy />
    </div>
  );
};

export default ManageOffers;

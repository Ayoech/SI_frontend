import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../Header';
import Sideent from '../../Sideent';
import ManageOffersService from '../../Services/ManageOffers';

const ManageOffers = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(true);
  const [offres, setOffres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedDescription, setSelectedDescription] = useState('');

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const getOffers = async () => {
    try {
      const response = await ManageOffersService(page, 3);
      setOffres(response.data);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error('Error fetching offers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleViewFull = (description) => {
    setSelectedDescription(description);
    setShowModal(true);
  };

  useEffect(() => {
    getOffers();
  }, [page]);

  return (
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} />
      <Sideent openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      <div
        className={`flex justify-center items-start ${
          openSidebarToggle ? 'ml-[56rem] mt-[4rem] pt-[0.1rem]' : 'ml-[16rem]'
        }`}
      >
        <div className="rounded-lg p-24 mt-8 ml-28">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-300 px-12 py-2">Numéro</th>
                    <th className="border border-gray-300 px-12 py-2">Description</th>
                    <th className="border border-gray-300 px-12 py-2">Début</th>
                    <th className="border border-gray-300 px-12 py-2">Fin</th>
                    <th className="border border-gray-300 px-12 py-2">État</th>
                    <th className="border border-gray-300 px-12 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {offres.length > 0 ? (
                    offres.map((offer, index) => (
                      <tr key={offer.NUM_OFFRE} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                        <td className="border text-center border-gray-300 px-4 py-2">
                          <Link to={`/offer-details/${offer.NUM_OFFRE}`} className="text-blue-500 hover:underline">
                            {offer.NUM_OFFRE}
                          </Link>
                        </td>
                        <td className="border text-center border-gray-300 px-4 py-2">
  {offer.DESCRIPTION.length > 50
    ? `${offer.DESCRIPTION.slice(0, 50)}...`
    : offer.DESCRIPTION}
  {offer.DESCRIPTION.length > 50 && (
    <button
      className="text-blue-500 ml-2 hover:underline"
      onClick={() => handleViewFull(offer.DESCRIPTION)}
    >
      View Full
    </button>
  )}
</td>

                        <td className="border text-center border-gray-300 px-4 py-2">
                          {offer.DATE_DEBUT.split('T')[0]}
                        </td>
                        <td className="border border-gray-300 text-center px-4 py-2">
                          {offer.DATE_FIN.split('T')[0]}
                        </td>
                        <td className="border border-gray-300 text-center px-4 py-2">{offer.ETAT_OFFRE}</td>
                        <td className="border border-gray-300 text-center px-4 py-2">
                          <button
                            onClick={() => {
                              // Handle offer status update
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
                      <td colSpan="6" className="text-center py-4">
                        No offers available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* Pagination controls */}
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                  className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-l"
                >
                  Previous
                </button>
                <span className="px-4 py-2">{`Page ${page} of ${totalPages}`}</span>
                <button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages}
                  className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-r"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Modal for Full Description */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full">
            <h2 className="text-lg font-semibold mb-4">Full Description</h2>
            <p>{selectedDescription}</p>
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageOffers;

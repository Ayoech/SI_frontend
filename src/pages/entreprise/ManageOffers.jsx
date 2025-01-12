import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../Header';
import Sideent from '../../Sideent';
import ManageOffersService from '../../Services/ManageOffers';

const ManageOffers = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(true);
  const [offres, setOffres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1); // Track the current page
  const [totalPages, setTotalPages] = useState(1); // Track the total number of pages

  const num_utilisateur = 69; // Example user ID

  // Open or close sidebar
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  // Fetch offers with pagination
  const getOffers = async () => {
    try {
      const response = await ManageOffersService(page, 3); // Fetch with 3 results per page
      setOffres(response.data);
      setTotalPages(response.totalPages); // Assuming the backend returns the total pages
    } catch (error) {
      console.error('Error fetching offers:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle page change (next/prev)
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    getOffers();
  }, [page]);

  return (
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} />
      <Sideent openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      <div
        className={`flex justify-center items-start ${openSidebarToggle ? 'ml-[56rem] mt-[4rem] pt-[0.1rem]' : 'ml-[16rem]'}`}
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
                        <td className="border text-center border-gray-300 px-4 py-2">{offer.DESCRIPTION}</td>
                        <td className="border text-center border-gray-300 px-4 py-2">{offer.DATE_DEBUT.split('T')[0]}</td>
                        <td className="border border-gray-300 text-center px-4 py-2">{offer.DATE_FIN.split('T')[0]}</td>
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
                      <td colSpan="6" className="text-center py-4">No offers available</td>
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
    </div>
  );
};

export default ManageOffers;

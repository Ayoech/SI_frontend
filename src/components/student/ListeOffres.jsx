import React, { useState, useEffect } from 'react';
import Header from '../../Header';
import Sideent from '../../Sideent';
import ManageOffersService from '../../Services/ManageOffers';
import BOX from '../../components/BOX';
import { BoxOffre } from '../../components/BoxOffre';

const ManageOffers = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(true);
  const [offres, setOffres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOfferId, setSelectedOfferId] = useState(null);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [showOffre, setShowOffre] = useState(false);

  // Open or close sidebar
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  // Fetch offers
  useEffect(() => {
    const getOffers = async () => {
      try {
        const response = await ManageOffersService();
        setOffres(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching offers:', error);
      } finally {
        setLoading(false);
      }
    };
    getOffers();
  }, []);

  // Handle offer selection
  useEffect(() => {
    if (selectedOfferId !== null) {
      const foundOffer = offres.find((offre) => offre.NUM_OFFRE === selectedOfferId);
      setSelectedOffer(foundOffer);
    }
  }, [selectedOfferId, offres]);

  const handleBoxClick = (offerId) => {
    setSelectedOfferId(offerId);
    setShowOffre(true);
  };

  const toggleOffreBox = (state) => {
    setShowOffre(state);
  };

  const togglePostulationForme = () => {
    console.log('Toggle postulation form');
  };

  return (
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} />
      <Sideent openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      <div
        className={`flex justify-center items-start ${
          openSidebarToggle ? 'ml-[56rem] mt-[4rem] pt-[0.1rem]' : 'ml-[16rem]'
        }`}
      >
        <div className="p-4 flex flex-col lg:flex-row gap-4">
          <div style={{ width: '40%' }}>
            {loading ? (
              <p>Loading...</p>
            ) : (
              offres.map((offre) => (
                <BOX
                  key={offre.NUM_OFFRE}
                  title={offre.TITRE}
                  company={offre.NOM_ENTREPRISE}
                  location="Remote" // Replace with dynamic data if available
                  type="Temps plein" // Replace with dynamic data if available
                  handleBoxClick={() => handleBoxClick(offre.NUM_OFFRE)}
                />
              ))
            )}
          </div>
          <div className="flex-1">
            {showOffre && selectedOffer && (
              <BoxOffre
                titre={selectedOffer.TITRE}
                description={selectedOffer.DESCRIPTION}
                domaine="Html,CSS,React,SpringBoot" // Replace with dynamic data if available
                toggleOffreBox={toggleOffreBox}
                togglePostulationForme={togglePostulationForme}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageOffers;

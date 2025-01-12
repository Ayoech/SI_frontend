import React from 'react'
import BOX from '../BOX'
import { BoxOffre } from '../BoxOffre'
import { useState , useEffect} from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const ListeOffres = ({selectedOfferId,setSelectedOfferId,toggleOffreBox,showOffre,offres,togglePostulationForme}) => {

  //const [selectedOfferId, setSelectedOfferId] = useState(null);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const offersPerPage = 3;

  useEffect(() => {
    if (selectedOfferId !== null) {
      console.log("offer id ine effect: ",selectedOfferId)
      const foundOffer = offres.find((offre) => offre.NUM_OFFRE === selectedOfferId);
      setSelectedOffer(foundOffer);
    }
  }, [selectedOfferId]);

  const handleBoxClick = (offerId) => {
    setSelectedOfferId(offerId);
    toggleOffreBox(true);
    
  };

  useEffect(() => {
    console.log('showOffre:', showOffre);
    console.log('selectedOffer:', selectedOffer);
    console.log('slectedOfferId: ',selectedOfferId)
  }, [selectedOffer, showOffre]);

  const indexOfLastOffer = currentPage * offersPerPage;
  const indexOfFirstOffer = indexOfLastOffer - offersPerPage;
  const currentOffers = offres.slice(indexOfFirstOffer, indexOfLastOffer);
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  /*const handlePostulerClick = (offerId) => {
    togglePostulationForme(); 
  };*/
  

    return (
        <div className="p-4 flex flex-col lg:flex-row gap-4">
          <div style={{width:'40%'}}>
          {currentOffers.map((offre)=>(<BOX
            title={offre.TITRE}
            company={offre.NOM_ENTREPRISE}
            location="Remote"
            type="Temps plein"
            handleBoxClick={() => handleBoxClick(offre.NUM_OFFRE)}
          />))}
          <div className="p-4">
        <Stack spacing={2} className="flex justify-center">
          <Pagination count={Math.ceil(offres.length / offersPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              variant="outlined"
              shape="rounded" />
        </Stack>
      </div>
          </div>
          <div className='flex-1 '>
            {showOffre && selectedOffer &&(  <BoxOffre 
              titre={selectedOffer.TITRE}
              description={selectedOffer.DESCRIPTION}
              domaine ="Html,CSS,React,SprinBoot"
              toggleOffreBox={toggleOffreBox}
              togglePostulationForme={() => togglePostulationForme()}
            />)}
           
          </div>
          
        </div>
      )
}

export default ListeOffres



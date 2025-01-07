import React from 'react'
import BOX from '../BOX'
import { BoxOffre } from '../BoxOffre'
import { useState , useEffect} from 'react'

const ListeOffres = ({selectedOfferId,setSelectedOfferId,toggleOffreBox,showOffre,offres,togglePostulationForme}) => {

  //const [selectedOfferId, setSelectedOfferId] = useState(null);
  const [selectedOffer, setSelectedOffer] = useState(null);

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
    console.log('testing: ',showOffre && selectedOffer)
  };

  useEffect(() => {
    console.log('showOffre:', showOffre);
    console.log('selectedOffer:', selectedOffer);
    console.log('slectedOfferId: ',selectedOfferId)
  }, [selectedOffer, showOffre]);
  /*const handlePostulerClick = (offerId) => {
    togglePostulationForme(); 
  };*/
  

    return (
        <div className="p-4 flex flex-col lg:flex-row gap-4">
          <div style={{width:'40%'}}>
          {offres.map((offre)=>(<BOX
            title={offre.TITRE}
            company={offre.NOM_ENTREPRISE}
            location="Remote"
            type="Temps plein"
            handleBoxClick={() => handleBoxClick(offre.NUM_OFFRE)}
          />))}
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



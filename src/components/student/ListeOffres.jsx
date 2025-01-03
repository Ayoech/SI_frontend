import React from 'react'
import BOX from '../BOX'
import { BoxOffre } from '../BoxOffre'
import { useState } from 'react'

const ListeOffres = ({toggleOffreBox,showOffre,offres,togglePostulationForme}) => {

  const [selectedOfferId, setSelectedOfferId] = useState(null);

  const selectedOffer = offres.find((offre) => offre.id === selectedOfferId);

  const handleBoxClick = (offerId) => {
    setSelectedOfferId(offerId);
    toggleOffreBox(true);
  };

    return (
        <div className="p-4 flex flex-col lg:flex-row gap-4">
          <div>
          {offres.map((offre)=>(<BOX
            title="Crypto Data Scientist / Machine Learning - LLM Engineer (Morocco -Remote)"
            company="Token Metrics"
            location="Remote"
            type="Temps plein"
            handleBoxClick={() => handleBoxClick(offre.id)}
          />))}
          </div>
          <div className='flex-1 '>
            {showOffre  &&  <BoxOffre 
              titre="crypto"
              description="hhdjskslsllslsllsmsmsmmsmsmsm"
              domaine ="Html,CSS,React,SprinBoot"
              toggleOffreBox={toggleOffreBox}
              togglePostulationForme ={togglePostulationForme}
            />}
           
          </div>
        </div>
      )
}

export default ListeOffres



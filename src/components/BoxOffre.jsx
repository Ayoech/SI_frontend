import React, { useState } from 'react'
import { X } from 'lucide-react'

export const BoxOffre = ({titre,description,domaine,toggleOffreBox,togglePostulationForme}) => {

  const handleCloseClick = () => {
    toggleOffreBox(); 
  };

  

  
  return (
    <div className="max-w-2xl w-full border border-gray-200 rounded-lg shadow-sm bg-white" style={{height:'80vh'}}>
    <div className="flex flex-row items-start justify-between p-6 pb-2">
      <div className="space-y-1 pr-10">
        <h3 className="font-semibold text-4xl font-bold text-black leading-tight mb-8">
          {titre}
        </h3>
        <div className="space-y-1 mb-8">
          <button className='bg-blue-500 text-white rounded-full py-2 px-6 font-semibold hover:bg-blue-600 transition duration-300 mb-8' onClick={togglePostulationForme}>Postuler</button>
        </div>
        <div className="space-y-1">
          <p className="text-base text-black font-bold text-3xl">Description</p>
          <p className="text-base text-gray-700">{description}</p>
        </div>
      </div>
      <button className="text-gray-400 hover:text-gray-500" onClick={handleCloseClick}>
        <X className="h-5 w-5" />
      </button>
    </div>
    <div className="px-6 pb-6 mt-8">
      <div className="flex flex-col gap-3">
      <span className="inline-flex items-center py-0.5 rounded-full text-3xl font-medium text-gray-800 font-bold">
          Skills
        </span>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-gray-800">
          {domaine}
        </span>
      </div>
    </div>
  </div>
  )
}

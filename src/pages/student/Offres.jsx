import React from 'react'
import ListeOffres from '../../components/student/ListeOffres';
import { useState,useEffect } from 'react';
import Header from '../../Header'
import Sidebar from '../../Sidebar';
import Homy from '../../Homy';
import PostulationFormeBox from '../../components/student/PostulationFormeBox';

const Offres = () => {
const [openSidebarToggle, setOpenSidebarToggle] = useState(true)
  
  const OpenSidebar = () => {
      setOpenSidebarToggle(!openSidebarToggle)
  }

  const [showOffre,setShowOffre] = useState(false);
  
  const toggleOffreBox = (param) => {
      if (param === undefined || param === null) {
        setShowOffre(!showOffre); 
      } else {
        setShowOffre(param); 
      }
  };

  const [offres, setOffres] = useState([]); 

  useEffect(() => {
    setOffres([
      {
        id: 1,
        title: "Crypto Data Scientist",
        company: "Token Metrics",
        location: "Remote",
        type: "Full-Time",
        description: "Exciting role working with crypto data!",
        domain: "Python, Machine Learning, Data Analysis"
      },
      {
        id: 2,
        title: "Frontend Developer",
        company: "Tech Innovators",
        location: "Casablanca",
        type: "Contract",
        description: "Building modern UIs for web applications.",
        domain: "HTML, CSS, React, Redux"
      }
    ]);
  }, []);
  
  const [postulationForme,setPostulationForme] = useState(false);
  const togglePostulationForme = () => {
    setPostulationForme(!postulationForme);
  };

  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar}/>
          <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
          {postulationForme && (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-opacity-50 bg-gray-500">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
            <PostulationFormeBox togglePostulationForme={togglePostulationForme} />
          </div>
        </div>
      )}
          <div className='listeOffres'>
               <ListeOffres toggleOffreBox={toggleOffreBox} showOffre={showOffre} offres={offres} togglePostulationForme={togglePostulationForme}/>
          </div>
      <Homy />
    </div>
  )
}

export default Offres;
import React from 'react'
import ListeOffres from '../../components/student/ListeOffres';
import { useState,useEffect } from 'react';
import Header from '../../Header'
import Sidebar from '../../Sidebar';
import Homy from '../../Homy';
import PostulationFormeBox from '../../components/student/PostulationFormeBox';
import FetchOffresPourEtudiant from '../../Services/FetchOffresPourEtudiant';

const Offres = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(true)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOfferId, setSelectedOfferId] = useState(null);

  
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
    const fetchOffres = async()=>{
      try{
        const response = await FetchOffresPourEtudiant();
        console.log('data: ',response.data)
        setOffres(response.data);
      }catch(error){
        setError(error.message);
        console.log('error:'+error);
      }finally{
        setLoading(false)
      }
    }
    fetchOffres();
  }, []);
  
  const [postulationForme,setPostulationForme] = useState(false);
  const togglePostulationForme = () => {
    setPostulationForme(!postulationForme);
    //setSelectedOfferId(offerId);
  };

  if(loading){
    return (
      <div className='grid-container'>
        <Header OpenSidebar={OpenSidebar}/>
            <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
            <div className='profileform'>
            <div style={{ textAlign: 'center', paddingTop: '50px' }}>
            <p style={{ fontSize: '20px', marginTop: '10px' }}>Loading Information...</p>
            </div>
            </div>
        <Homy />
      </div>
    )
  }

  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar}/>
          <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
          {postulationForme && (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-opacity-50 bg-gray-500">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
            <PostulationFormeBox togglePostulationForme={togglePostulationForme} offerId={selectedOfferId} />
          </div>
        </div>
      )}
          <div className='listeOffres'>
               <ListeOffres toggleOffreBox={toggleOffreBox} showOffre={showOffre} offres={offres}
                togglePostulationForme={togglePostulationForme} selectedOfferId={selectedOfferId}
                setSelectedOfferId={setSelectedOfferId}/>
          </div>
      <Homy />
    </div>
  )
}

export default Offres;
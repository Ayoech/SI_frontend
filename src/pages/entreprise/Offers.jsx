import React,{useState,useEffect} from 'react'
import Sideent from '../../Sideent'
import Header from '../../Header';
import Homy from '../../Homy';
import ListeOffres from '../../components/entreprise/ListeOffres';
import CreateOffer from './CreateOffer';
import fetchEtudiants from '../../Services/ListeEtudiantService';



const Offers = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const OpenSidebar = () => {
      setOpenSidebarToggle(!openSidebarToggle)
  }

  const [offres,setOffres] = useState([])


  //forme etudiant
  const [formeOffre, setFormeOffre] = useState(false);

  const toggleFormeOffre = () => {
    setFormeOffre(!formeOffre)
  }

  useEffect(()=>{
    const getEtudiants = async () => {
      try {
        const response = await fetchEtudiants();
        setOffres(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    getEtudiants();
  },[])


  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar}/>
          <Sideent openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
          
          <div className='listeOffres'>
               <ListeOffres offres = {offres} />
          </div>
      <Homy />
    </div>
  )
}

export default Offers;
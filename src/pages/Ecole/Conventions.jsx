import React,{useState,useEffect} from 'react'
import EcoleSidebar from '../../components/ecole/EcoleSidebar';
import Header from '../../Header';
import Homy from '../../Homy';
import ListeConvention from '../../components/ecole/ListeConvention';




const Conventions = () => {
const [openSidebarToggle, setOpenSidebarToggle] = useState(true)
  
  const OpenSidebar = () => {
      setOpenSidebarToggle(!openSidebarToggle)
  }
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [PostulationDetails,setPostulationDetails] = useState([]);
    

  useEffect(()=>{
    const fetchdetails = async () => {
      try {
        const data = await fetchPostulationDetails();
        setEntreprises(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchdetails();
  },[])


  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar}/>
          <EcoleSidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
          <div className='listeConvention'>
               <ListeConvention PostulationDetails={PostulationDetails}/>
          </div>
      <Homy />
    </div>
  )
}

export default Conventions;
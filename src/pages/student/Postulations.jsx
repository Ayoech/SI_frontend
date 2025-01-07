import Sidebar from '../../Sidebar';
import ListePostulation from '../../components/student/ListePostulation';
import Header from '../../Header';
import { useState,useEffect } from 'react';
import Homy from '../../Homy';
import fetchPostulationDetailsPourEtudiant from '../../Services/fetchPostulationDetailsPourEtudiant';

const Postulations = () => {

  const [loading,setLoading] = useState(true);
  const [error,setError] = useState(null)

    const [openSidebarToggle, setOpenSidebarToggle] = useState(true);
      
      const OpenSidebar = () => {
          setOpenSidebarToggle(!openSidebarToggle)
      }
  
    const [postulations, setPostulations] = useState([]); 
  
    useEffect(() => {
      const fetchData = async()=>{
        try{
          const response = await fetchPostulationDetailsPourEtudiant();
          setPostulations(response.data)
          console.log("postulations: ", postulations)
        }catch(error){
          setError(error.message);
          console.log('error:'+error);
        }finally{
          setLoading(false)
        }
      }
      fetchData();
    }, []);
    
    const [postulationForme,setPostulationForme] = useState(false);
    const togglePostulationForme = () => {
      setPostulationForme(!postulationForme);
    };
  
  return (
    <div className='grid-container'>
    <Header OpenSidebar={OpenSidebar}/>
        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
        <div className='listePostulation'>
             <ListePostulation postulations ={postulations} />
        </div>
      <Homy />
      </div>
  )
};

export default Postulations
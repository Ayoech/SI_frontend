import React,{useState,useEffect} from 'react'
import EcoleSidebar from '../../components/ecole/EcoleSidebar';
import Header from '../../Header';
import Homy from '../../Homy';
import ListeEntreprise from '../../components/ecole/ListeEntreprise'
import fetchEntreprises from '../../Services/ListeEntrepriseService';


const Entreprise = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [entreprises,setEntreprises] = useState([]);
  
  const OpenSidebar = () => {
      setOpenSidebarToggle(!openSidebarToggle)
  }


  //forme etudiant
  const [formeEtudiant, setFormeEtudiant] = useState(false);

  const toggleFormeEtudiant = () => {
    setFormeEtudiant(!formeEtudiant)
  }

  useEffect(()=>{
    const getEntreprises = async () => {
      try {
        const data = await fetchEntreprises();
        setEntreprises(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    getEntreprises();
  },[])


  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar}/>
          <EcoleSidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
          
          <div className='listeOffres'>
                <div className='mb-4'>
                  <button className='rounded-md bg-blue-500 hover:bg-blue-700 p-4 text-white font-semibold transition duration-300' onClick={toggleFormeEtudiant}>Ajouter une Entreprise</button>
                </div>
               <ListeEntreprise entreprises = {entreprises} />
          </div>
      <Homy />
    </div>
  )
}

export default Entreprise;
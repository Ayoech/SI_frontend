import React,{useState,useEffect} from 'react'
import ListeEtudiant from '../../components/ecole/ListeEtudiant';
import EcoleSidebar from '../../components/ecole/EcoleSidebar';
import Header from '../../Header';
import Homy from '../../Homy';
import FormeEtudiant from '../../components/ecole/FormeEtudiant';
import fetchEtudiants from '../../Services/ListeEtudiantService';



const Etudiant = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const OpenSidebar = () => {
      setOpenSidebarToggle(!openSidebarToggle)
  }

  const [etudiants,setEtudiants] = useState([])


  //forme etudiant
  const [formeEtudiant, setFormeEtudiant] = useState(false);

  const toggleFormeEtudiant = () => {
    setFormeEtudiant(!formeEtudiant)
  }

  useEffect(()=>{
    const getEtudiants = async () => {
      try {
        const response = await fetchEtudiants();
        setEtudiants(response.data);
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
          <EcoleSidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
          {formeEtudiant && (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-opacity-50 bg-gray-500 " >
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full mt-24 mb-24">
            <FormeEtudiant formeEtudiant={formeEtudiant} toggleFormeEtudiant={toggleFormeEtudiant} />
          </div>
        </div>
      )}
          <div className='listeOffres'>
                <div className='mb-4'>
                  <button className='rounded-md bg-blue-500 hover:bg-blue-700 p-4 text-white font-semibold transition duration-300' onClick={toggleFormeEtudiant}>Ajouter un étudiant</button>
                </div>
               <ListeEtudiant etudiants={etudiants}/>
          </div>
      <Homy />
    </div>
  )
}

export default Etudiant;
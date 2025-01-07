import React,{useState,useEffect} from 'react'
import EcoleSidebar from '../../components/ecole/EcoleSidebar';
import Header from '../../Header';
import Homy from '../../Homy';
import ListeEntreprise from '../../components/ecole/ListeEntreprise'
import fetchEntreprises from '../../Services/ListeEntrepriseService';
import FormeEntreprise from '../../components/ecole/FormeEntreprise';


const Entreprise = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [entreprises,setEntreprises] = useState([]);
  
  const OpenSidebar = () => {
      setOpenSidebarToggle(!openSidebarToggle)
  }


  //forme etudiant
  const [formeEntreprise, setFormeEntreprise] = useState(false);

  const toggleFormeEntreprise = () => {
    setFormeEntreprise(!formeEntreprise)
  }

  useEffect(()=>{
    const getEntreprises = async () => {
      try {
        const response = await fetchEntreprises();
        setEntreprises(response.data);
        console.log('data: ', response.data)
        console.log('entreprises: ',entreprises)
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
          {formeEntreprise && (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-opacity-50 bg-gray-500 " >
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full mt-24 mb-24">
            <FormeEntreprise formeEntreprise={formeEntreprise} toggleFormeEntreprise={toggleFormeEntreprise} />
          </div>
        </div>
      )}
          <div className='listeOffres'>
                <div className='mb-4'>
                  <button className='rounded-md bg-blue-500 hover:bg-blue-700 p-4 text-white font-semibold transition duration-300' onClick={toggleFormeEntreprise}>Ajouter une Entreprise</button>
                </div>
               <ListeEntreprise entreprises = {entreprises} />
          </div>
      <Homy />
    </div>
  )
}

export default Entreprise;
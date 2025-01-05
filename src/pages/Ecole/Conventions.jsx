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


  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar}/>
          <EcoleSidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
          <div className='listeConvention'>
               <ListeConvention />
          </div>
      <Homy />
    </div>
  )
}

export default Conventions;
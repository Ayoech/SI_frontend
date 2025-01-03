import Sidebar from '../../Sidebar';
import ListePostulation from '../../components/student/ListePostulation';
import Header from '../../Header';
import { useState } from 'react';
import Homy from '../../Homy';

const Postulations = () => {

    const [openSidebarToggle, setOpenSidebarToggle] = useState(true)
      
      const OpenSidebar = () => {
          setOpenSidebarToggle(!openSidebarToggle)
      }
  return (
    <div className='grid-container'>
    <Header OpenSidebar={OpenSidebar}/>
        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
        <div className='listePostulation'>
             <ListePostulation />
        </div>
      <Homy />
      </div>
  )
};

export default Postulations
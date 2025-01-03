import React from 'react'
import Header from '../../Header';
import Homy from '../../Homy';
import { useState } from 'react';
import ProfileForm from '../../components/student/ProfileForm';
import Sidebar from '../../Sidebar';

const Profile = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(true)
  
  const OpenSidebar = () => {
      setOpenSidebarToggle(!openSidebarToggle)
  }
  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar}/>
          <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
          <div className='profileform'>
               <ProfileForm />
          </div>
      <Homy />
    </div>
  )
};

export default Profile;

   

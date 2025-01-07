import React, { useEffect } from 'react'
import Header from '../../Header';
import Homy from '../../Homy';
import { useState } from 'react';
import ProfileForme from '../../components/student/ProfileForme';
import Sidebar from '../../Sidebar';
import CvForme from '../../components/student/CvForme';
import fetchEtudiantProfileData from '../../Services/fetchEtudiantProfileData';
import { FaSearch } from 'react-icons/fa';


const Profile = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(true);
  const [profileData,setProfileData] = useState(null);
  
  const OpenSidebar = () => {
      setOpenSidebarToggle(!openSidebarToggle)
  }

  useEffect(() => {
    const fetchProfileData = async () => {
      console.log("Fetching profile data..."); // Debugging point
      try {
        console.log("begin Fetching profile data...");
        const data = await fetchEtudiantProfileData();
        console.log("Profile data fetched:", data); // Ensure data is fetched
        setProfileData(data.data);
      } catch (error) {
        console.error("Failed to fetch profile data", error);
      }
    };
  
    fetchProfileData();
  }, []);

  if (!profileData) {
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
          <div className='profileform'>
               <ProfileForme profileData={profileData} />
               <CvForme profileData={profileData} />
          </div>
      <Homy />
    </div>
  )
};

export default Profile;

   

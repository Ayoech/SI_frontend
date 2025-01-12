import React, { useEffect, useState } from 'react';
import Header from '../../Header';
import Sideent from '../../Sideent';
import EntrepriseProfileForm from './EntrepriseProfileForm';
import fetchEntrepriseProfileData from '../../Services/fetchEntrepriseProfileData';

const EntrepriseProfile = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(true);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const data = await fetchEntrepriseProfileData();
        setProfileData(data); // Directly use the response if already structured
      } catch (error) {
        console.error('Failed to fetch entreprise profile data:', error);
      } finally {
        setLoading(false); // Ensure loading stops
      }
    };

    fetchProfileData();
  }, []);

  if (loading) {
    return (
      <div className="grid-container">
        <Header OpenSidebar={OpenSidebar} />
        <Sideent openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
        <div className="flex justify-center items-center">
          <p className="text-xl ml-58 mt-58">Loading...</p>
        </div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="grid-container">
        <Header OpenSidebar={OpenSidebar} />
        <Sideent openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
        <div className="flex justify-center items-center">
          <p className="text-xl ml-58 mt-58">Failed to load Entreprise Information.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} />
      <Sideent openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      <div style={{ marginTop: "100px" }} className={`profile-container ${openSidebarToggle ? 'ml-[48rem] mt-[4rem]' : 'ml-[16rem]'} p-6`}>
        <EntrepriseProfileForm profileData={profileData} />
      </div>
    </div>
  );
};

export default EntrepriseProfile;

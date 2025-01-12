import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../Header';
import Sideent from '../../Sideent';
import Homy from '../../Homy';
import { Link } from 'react-router-dom';
const GestionnaireList = () => {
  const [gestionnaires, setGestionnaires] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openSidebarToggle, setOpenSidebarToggle] = useState(true);

  const fetchGestionnaires = async () => {
    try {
      setLoading(true);
  
      // Retrieve user details from local storage
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?.userId;
  
      if (!userId) {
        console.error("userId not found in local storage.");
        setError("Failed to retrieve user information.");
        return;
      }
  
      // Make a GET request with userId in the URL
      const response = await axios.get(`http://localhost:3000/api/v1/entreprise/getgestionnaire/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Ensure the token is included in the headers
        },
      });
  
      // Set the retrieved gestionnaires
      setGestionnaires(response.data.data || []);
    } catch (err) {
      console.error('Error fetching gestionnaires:', err);
      setError('Failed to fetch gestionnaires.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (num_ge) => {
    try {
      
  
      const response = await axios.delete(`http://localhost:3000/api/v1/entreprise/deletegestionnaire`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        data: { num_ge }, // Send the `userId` and `nom` in the request body
      });
  
      if (response.status === 200) {
        alert('Gestionnaire deleted successfully!');
        fetchGestionnaires(); // Refresh the list after deletion
      }
    } catch (err) {
      console.error('Error deleting gestionnaire:', err);
      alert('Failed to delete gestionnaire.');
    }
  };
  

  useEffect(() => {
    fetchGestionnaires();
  }, []);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} />
      <Sideent openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      
      <div
        className={`flex justify-center items-start ${openSidebarToggle ? 'ml-[40rem] mt-[4rem] pt-[0.1rem]' : 'ml-[16rem]'}`}
      >
        <Link to="/entreprise/gestform">
        <button style= {{marginLeft: "20px",marginTop:"80px",  padding:"10px", width:"140px"}}className="bg-blue-500 text-white px-28 py-8 mt-52 ml-64 rounded hover:bg-blue-600">
            Create manager
          </button >
          </Link>
        <div className="container mx-auto p-6 " style={{width: "600px", marginTop: "90px"}}>
          
          
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            
            <table className="table-auto border-collapse w-full" style={{marginTop: "80px", marginLeft: "90px"}}>
              <thead>
                <tr className="bg-gray-200">
                  <th className="border px-12 py-2">Nom</th>
                  <th className="border px-12 py-2">Prénom</th>
                  <th className="border px-12 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {gestionnaires.map((gestionnaire, index) => (
                  <tr key={gestionnaire.NUM_GE}>
                    <td className="border text-center px-4 py-2">{gestionnaire.NOM}</td>
                    <td className="border text-center px-4 py-2">{gestionnaire.PRENOM}</td>
                    <td className="border text-center px-4 py-2">
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded"
                        onClick={() => handleDelete(gestionnaire.NUM_GE)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <Homy />
    </div>
  );
};

export default GestionnaireList;

import React, { useState } from 'react';
import Header from '../../Header';
import Sideent from '../../Sideent';
import Homy from '../../Homy';
import { Link, useParams } from 'react-router-dom';

const CreateInternalAccount = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(true);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
  });
  const [internalAccounts, setInternalAccounts] = useState([]);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setInternalAccounts((prevAccounts) => [...prevAccounts, formData]);
    console.log('Internal account created:', formData);
    setFormData({ nom: '', prenom: '', email: '' });
  };

  return (
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} />
      <Sideent openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      <div
        className={`flex flex-col items-center min-h-screen bg-gray-100 ${
          openSidebarToggle ? 'ml-[36rem]' : 'ml-[16rem]'
        } mt-32`}
      >
       
        <div className=" mt-16 ml-88 p-6 rounded-md w-full " style={{width: "600px", marginLeft:"700px"}}>
        <div className="flex justify-left mb-12 ml-4" style={{width: '200px'}}>
            <Link to ="/entreprise/gestform">
            <button  className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>
              Create new account 
            </button>
            </Link> 
            
        </div>
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-center" style={{width: "500px"}}>Nom</th>
                <th className="border border-gray-300 px-4 py-2 text-center" style={{width: "500px"}}>Prénom</th>
                <th className="border border-gray-300 px-4 py-2 text-center" style={{width: "500px"}}>Email</th>
              </tr>
            </thead>
            <tbody>
              {internalAccounts.length > 0 ? (
                internalAccounts.map((account, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 px-4 py-2">{account.nom}</td>
                    <td className="border border-gray-300 px-4 py-2">{account.prenom}</td>
                    <td className="border border-gray-300 px-4 py-2">{account.email}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-4">
                    No internal accounts added yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Homy />
    </div>
  );
};

export default CreateInternalAccount;

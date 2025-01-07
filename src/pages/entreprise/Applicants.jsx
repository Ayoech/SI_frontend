import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../Header';
import Sideent from '../../Sideent';
import Homy from '../../Homy';

const Applicants = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(true);
  const [applicantsGroupedByOffer, setApplicantsGroupedByOffer] = useState([]);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/entreprise/offers/applicants');
        setApplicantsGroupedByOffer(response.data);
      } catch (error) {
        console.error('Error fetching applicants:', error.message);
      }
    };
    fetchApplicants();
  }, []);

  const handleAction = async (applicantId, action) => {
    try {
      const applicationData = { applicationId: applicantId };
      const apiEndpoint = action === 'to_be_interviewed' 
        ? '/api/v1/entreprise/applicants/invite'
        : action === 'accepted'
        ? '/api/v1/entreprise/applications/validate'
        : '/api/v1/entreprise/applications/reject';
        
      const response = await axios.post(apiEndpoint, applicationData);
      alert(response.data.message || `Application ${action} successfully.`);
    } catch (error) {
      console.error(`Error processing action ${action}:`, error.message);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} />
      <Sideent openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      <div
        className={`flex justify-center items-start min-h-screen  ${
          openSidebarToggle ? 'ml-[36rem]' : 'ml-[16rem]'
        } mt-32`}
      >
        <div className=" shadow-lg rounded-lg p-6 w-full ">
          
          <table className="table-auto w-full border-collapse border border-gray-300 text-left">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="border border-gray-300 px-4 py-2">Offer ID</th>
                <th className="border border-gray-300 px-4 py-2">Full Name</th>
                <th className="border border-gray-300 px-4 py-2">Motivation Letter</th>
                <th className="border border-gray-300 px-4 py-2">CV</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applicantsGroupedByOffer.map((group) => (
                <React.Fragment key={group.offerId}>
                  <tr>
                    <td colSpan="5" className="bg-blue-500 text-white text-center">
                      <strong>Offer {group.offerId}</strong>
                    </td>
                  </tr>
                  {group.applicants.map((applicant) => (
                    <tr key={applicant.num_postulation}>
                      <td>{group.offerId}</td>
                      <td>{applicant.nom} {applicant.prenom}</td>
                      <td>{applicant.lettre_motivation}</td>
                      <td>
                        <a
                          href={applicant.cv_path}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          View CV
                        </a>
                      </td>
                      <td className="flex gap-2">
                        <button
                          onClick={() => handleAction(applicant.num_postulation, 'to_be_interviewed')}
                          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                        >
                          Invite to Interview
                        </button>
                        <button
                          onClick={() => handleAction(applicant.num_postulation, 'accepted')}
                          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleAction(applicant.num_postulation, 'rejected')}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Homy />
    </div>
  );
};

export default Applicants;

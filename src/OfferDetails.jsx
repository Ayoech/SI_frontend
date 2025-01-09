import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header"; // Adjust the import path if needed
import Sideent from "./Sideent"; // Adjust the import path if needed
import { fetchApplicants } from "./Services/fetchApplicants"; // Adjust the import path if needed
import { scheduleInterview,  handleReject,  handleAccept } from './Services/PostulationService'; // Import the functions
const OfferDetails = () => {
  const { offerId } = useParams(); // Get the offer ID from the URL params
  const [applicants, setApplicants] = useState([]);
  const [openSidebarToggle, setOpenSidebarToggle] = useState(true);

  // Fetch applicants when the component mounts
  useEffect(() => {
    const loadApplicants = async () => {
      try {
        const responseData = await fetchApplicants(offerId);
        console.log(offerId)
        if (responseData.success) {
          const formattedApplicants = responseData.data.map((applicant) => ({
            id: applicant.NUM_POSTULATION,
            nom: applicant.NOM,
            prenom: applicant.PRENOM,
            lettre_motivation: applicant.LETTRE_MOTIVATION,
            cv_path:  applicant.CV_PATH, // Replace with actual CV path if available
            status: "Pending",
          }));
          setApplicants(formattedApplicants);
          console.log(applicants);
        }
      } catch (error) {
        console.error("Failed to load applicants:", error.message);
      }
    };

    loadApplicants();
  }, [offerId]);

  // Sidebar toggle
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  // Other component code (actions like Accept, Reject, Interview)...

  return (
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} />
      <Sideent openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      <div
        className={`flex justify-center items-start ${
          openSidebarToggle ? "ml-[56rem] mt-[4rem] pt-[0.1rem]" : "ml-[16rem]"
        }`}
      >
        <div className="rounded-lg p-24 max-w-6xl">
          <h1 className="text-2xl font-semibold mb-4">Applicants for Offer {offerId}</h1>

          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Nom</th>
                <th className="border border-gray-300 px-4 py-2">Prénom</th>
                <th className="border border-gray-300 px-4 py-2">Lettre de Motivation</th>
                <th className="border border-gray-300 px-4 py-2">CV Path</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applicants.length > 0 ? (
                applicants.map((applicant) => (
                  <tr key={applicant.id} className="bg-white">
                    <td className="border border-gray-300 px-8 py-2">{applicant.nom}</td>
                    <td className="border border-gray-300 px-8 py-2">{applicant.prenom}</td>
                    <td className="border border-gray-300 px-8 py-2">{applicant.lettre_motivation}</td>
                    <td className="border border-gray-300 px-8 py-2">{applicant.cv_path}</td>
                    <td className="border border-gray-300 px-8 py-2">
                      <button
                        onClick={() => handleAccept(applicant.id)}
                        className="bg-green-500 text-white mb-2 px-3 py-1 rounded hover:bg-green-600 mr-2"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleReject(applicant.id)}
                        className="bg-red-500 text-white px-3 py-1 mb-2 rounded hover:bg-red-600 mr-2"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => scheduleInterview(applicant.id)}
                        className="bg-blue-500 text-white px-3 mb-2 py-1 rounded hover:bg-blue-600"
                      >
                        Interview
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    No applicants found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OfferDetails;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header"; // Adjust the import path if needed
import Sideent from "./Sideent"; // Adjust the import path if needed
import { fetchApplicants } from "./Services/fetchApplicants"; // Adjust the import path if needed
import { scheduleInterview, handleReject, handleAccept } from './Services/PostulationService'; // Import the functions

const OfferDetails = () => {
  const { offerId } = useParams();
  const [applicants, setApplicants] = useState([]);
  const [openSidebarToggle, setOpenSidebarToggle] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);  // For modal visibility
  const [selectedApplicant, setSelectedApplicant] = useState(null);  // For selected applicant's letter

  // Fetch applicants
  useEffect(() => {
    const loadApplicants = async () => {
      try {
        const responseData = await fetchApplicants(offerId);
        if (responseData.success) {
          const formattedApplicants = responseData.data.map((applicant) => ({
            id: applicant.NUM_POSTULATION,
            nom: applicant.NOM,
            prenom: applicant.PRENOM,
            lettre_motivation: applicant.LETTRE_MOTIVATION,
            cv_path: applicant.CV_PATH, // Replace with actual CV path if available
            status: "Pending",
          }));
          setApplicants(formattedApplicants);
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

  // Open modal with applicant's letter
  const openModal = (applicant) => {
    setSelectedApplicant(applicant);
    setModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setModalOpen(false);
    setSelectedApplicant(null);
  };

  return (
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} />
      <Sideent openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      <div
        className={`flex justify-center items-start ${
          openSidebarToggle ? "ml-[56rem] mt-[4rem] pt-[0.1rem]" : "ml-[16rem]"
        }`}
      >
        <div className="rounded-lg p-8 mt-28 ml-36 max-w-6xl">
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 text-left">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border text-center border-gray-300 px-8 py-2">Nom</th>
                  <th className="border text-center border-gray-300 px-8 py-2">Prénom</th>
                  <th className="border text-center border-gray-300 px-8 py-2">Lettre de Motivation</th>
                  <th className="border text-center border-gray-300 px-8 py-2">CV</th>
                  <th className="border text-center border-gray-300 px-8 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {applicants.length > 0 ? (
                  applicants.map((applicant) => (
                    <tr key={applicant.id} className="bg-white hover:bg-gray-100">
                      <td className="border border-gray-300 px-4 py-2">{applicant.nom}</td>
                      <td className="border border-gray-300 px-4 py-2">{applicant.prenom}</td>
                      <td className="border border-gray-300 px-4 py-2">
                        <div className="max-w-xs truncate" title={applicant.lettre_motivation}>
                          {applicant.lettre_motivation}
                        </div>
                        <button
                          onClick={() => openModal(applicant)}
                          className="text-blue-500 hover:underline text-sm mt-1"
                        >
                          View Full
                        </button>
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {applicant.cv_path ? (
                          <a
                            href={applicant.cv_path}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                          >
                            View 
                          </a>
                        ) : (
                          "Not Available"
                        )}
                      </td>
                      <td className="border border-gray-300  px-4 py-4 flex gap-2">
                        <button
                          onClick={() => handleAccept(applicant.id)}
                          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleReject(applicant.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                          Reject
                        </button>
                        <button
                          onClick={() => scheduleInterview(applicant.id)}
                          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
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

      {/* Modal for full letter motivation */}
      {modalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-2/3 max-w-3xl">
            <h2 className="text-xl font-semibold mb-4">Lettre de Motivation</h2>
            <div className="max-h-96 overflow-auto">
              <p>{selectedApplicant?.lettre_motivation}</p>
            </div>
            <button
              onClick={closeModal}
              className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OfferDetails;

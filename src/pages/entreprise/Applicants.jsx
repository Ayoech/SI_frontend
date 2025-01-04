import React, { useState } from 'react';
import Header from '../../Header';
import Sideent from '../../Sideent';
import Homy from '../../Homy';

const Applicants = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(true);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const [applicants, setApplicants] = useState([
    {
      id: 1,
      fullName: 'John Doe',
      phone: '+123456789',
      letter: 'I am very motivated to join your company ',
      cvPath: '/path/to/sample-cv.pdf',
    },
  ]);

  const handleAction = (applicantId, action) => {
    alert(`Action: ${action} for Applicant ID: ${applicantId}`);
  };

  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar} />
      <Sideent openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      <div
  className={`flex justify-center items-start min-h-screen bg-gray-100 ${
    openSidebarToggle ? 'ml-[36rem]' : 'ml-[16rem]'
  } mt-32`}
>
  <div className='bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl'>
    
    <table className='table-auto w-full border-collapse border border-gray-300 text-left'>
      <thead>
        <tr className='bg-blue-500 text-white'>
          <th className='border border-gray-300 px-4 py-2'>Full Name</th>
          <th className='border border-gray-300 px-4 py-2'>Phone</th>
          <th className='border border-gray-300 px-4 py-2'>Motivation Letter</th>
          <th className='border border-gray-300 px-4 py-2'>CV</th>
          <th className='border border-gray-300 px-4 py-2'>Actions</th>
        </tr>
      </thead>
      <tbody>
        {applicants.map((applicant, index) => (
          <tr
            key={applicant.id}
            className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
          >
            <td className='border border-gray-300 px-4 py-2'>{applicant.fullName}</td>
            <td className='border border-gray-300 px-4 py-2'>{applicant.phone}</td>
            <td className='border border-gray-300 px-4 py-2'>{applicant.letter}</td>
            <td className='border border-gray-300 px-4 py-2'>
              <a
                href={applicant.cvPath}
                target='_blank'
                rel='noopener noreferrer'
                className='text-blue-500 hover:underline'
              >
                View CV
              </a>
            </td>
            <td className='border border-gray-300 px-4 py-8 flex gap-2'>
              <button
                onClick={() => handleAction(applicant.id, 'to_be_interviewed')}
                className='bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600'
              >
                Invite to Interview
              </button>
              <button
                onClick={() => handleAction(applicant.id, 'accepted')}
                className='bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600'
              >
                Accept
              </button>
              <button
                onClick={() => handleAction(applicant.id, 'rejected')}
                className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600'
              >
                Reject
              </button>
            </td>
          </tr>
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

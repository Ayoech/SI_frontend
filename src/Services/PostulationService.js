import axios from 'axios';
export const scheduleInterview = async (applicationId) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/v1/entreprise/applicants/invite`, // URL for the invite endpoint
        { applicationId }, // Send applicationId in the body
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Include token if needed
          },
        }
      );
      return response.data; // Return the response data after sending the request
    } catch (error) {
      console.error('Error scheduling interview for applicant:', error.message);
      throw new Error('Failed to schedule interview');
    }
  };
  export const handleReject = async (applicationId) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/v1/entreprise/applications/reject`, // URL for rejecting the applicant
        { applicationId }, // Send applicationId in the body
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Include token if needed
          },
        }
      );
      return response.data; // Return the response data after sending the request
    } catch (error) {
      console.error('Error rejecting applicant:', error.message);
      throw new Error('Failed to reject applicant');
    }
  };

  export const handleAccept = async (applicationId) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/v1/entreprise/applications/validate`, // URL for accepting the applicant
        { applicationId }, // Send applicationId in the body
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Include token if needed
          },
        }
      );
      return response.data; // Return the response data after sending the request
    } catch (error) {
      console.error('Error accepting applicant:', error.message);
      throw new Error('Failed to accept applicant');
    }
  };
  
  
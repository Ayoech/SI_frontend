import axios from 'axios';

export const fetchApplicants = async (offerId) => {
  const token = localStorage.getItem('token');  // Get token from localStorage, or from wherever it's stored
  if (!token) {
    throw new Error('No authentication token found');
  }

  try {
    const response = await axios.get(`http://localhost:3000/api/v1/entreprise/offers/${offerId}`, {
      headers: {
        Authorization: `Bearer ${token}`,  // Add token to the Authorization header
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching applicants:', error.message);
    throw error;  // Re-throw the error to be handled in the calling function
  }
};

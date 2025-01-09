import axios from 'axios';

export const fetchApplicants = async (offerId) => {
  const token = localStorage.getItem('token');  
  if (!token) {
    throw new Error('No authentication token found');
  }

  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/entreprise/offers/${offerId}`, {
      headers: {
        Authorization: `Bearer ${token}`,  
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching applicants:', error.message);
    throw error;  
  }
};

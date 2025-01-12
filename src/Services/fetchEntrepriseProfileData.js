import axios from 'axios';

const fetchEntrepriseProfileData = async () => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem("user"));
   
  if (!token) {
    throw new Error('No authentication token found');
  }

  if (!user.userId) {
    throw new Error('No userId provided');
  }

  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/entreprise/profile/${user.userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Ensure proper extraction of the response data
    if (response.data.success && response.data.data) {
      return response.data.data; // Extract and return the entreprise profile
    } else {
      throw new Error('Unexpected response format');
    }
  } catch (error) {
    console.error('Error fetching entreprise profile:', error.message);
    throw error;
  }
};

export default fetchEntrepriseProfileData;

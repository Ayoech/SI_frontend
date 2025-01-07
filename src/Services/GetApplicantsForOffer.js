import axios from 'axios';

export const GetApplicantsForOffer = async (apiEndpoint, applicationData) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}${apiEndpoint}`, applicationData);
    return response; // Return the response to be used in the component
  } catch (error) {
    throw new Error(`Error making POST request: ${error.message}`);
  }
};



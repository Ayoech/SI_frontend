import axios from 'axios';

const creerGestionnaireEntreprise = async (data) => {
    console.log(data);
  
    try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
            `http://localhost:3000/api/v1/entreprise/creerGestionnaire`, 
            data, 
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        ); // Log payload for debugging
    
  } catch (error) {
    if (error.response) {
      console.error("Error response data:", error.response.data); // Log server error details
      console.error("Status:", error.response.status); // Log status code
    } else {
      console.error("Error message:", error.message);
    }
    throw error; // Re-throw the error so it can be caught in the component
  }
  }



export default creerGestionnaireEntreprise;

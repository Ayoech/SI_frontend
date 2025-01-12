import axios from 'axios';

const ManageOffersService = async (page = 1, limit = 3) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    
    console.log("user:", user, "token:", token);
    console.log(user.userId);

    // Fetch paginated offers based on userId, page, and limit
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/entreprise/alloffers/${user.userId}`, {
      params: {
        page: page,   // Pass the page number
        limit: limit, // Set the limit to 3 offers per page (or any value passed to the function)
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Assuming the response contains paginated data
    return response.data; 
  } catch (error) {
    console.error("Error fetching offers:", error);
    throw new Error("Error fetching offers");
  }
};

export default ManageOffersService;

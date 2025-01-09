import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignOutService = async () => {
    console.log('signout1')
   
    
    try {
        console.log('signout2')
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/signout`, {}, { withCredentials: true });
        if (response.status === 200) {
            console.log('User logged out successfully');
            return "success";
        } else {
            console.error('Failed to log out', response);
        }
    } catch (error) {
        console.error('Error during logout:', error);
    }
};

export default SignOutService;

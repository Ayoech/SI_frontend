import axios from 'axios'

export const LoginService = async(formJSON) => {
    try{
        const response = await axios.post(`http://localhost:3000/api/v1/auth`,formJSON);
        if (response.data) {
            
            const token = response.data.token;
            localStorage.setItem("token", token);
            
            localStorage.setItem("user", JSON.stringify({
                userId: response.data.userId, 
                email: response.data.email,
                role: response.data.role,
            }));
          }
        return response;
    }catch(error){
        console.error('une erreur est survenue lors du signin', error);
        throw new Error('une erreur est survenue lors du signin');
    }
}
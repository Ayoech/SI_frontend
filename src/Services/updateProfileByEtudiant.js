import axios from 'axios'

export const updateProfileByEtudiant = async(formJSON) => {
    try{
        const token = localStorage.getItem("token");
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/etudiants`,formJSON,{
            headers: {
                Authorization: `Bearer ${token}` 
            }});
        
        return response;
    }catch(error){
        console.error('une erreur est survenue lors du signin', error);
        throw new Error('une erreur est survenue lors du signin');
    }
}
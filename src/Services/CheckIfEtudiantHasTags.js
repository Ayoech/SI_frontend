import axios from'axios';


const CheckIfEtudiantHasTags = async() =>  {

    try{
        const user = JSON.parse(localStorage.getItem("user"));
        const token = localStorage.getItem("token");
        const formJSON = {
            num_etudiant: user.userId
        };
        
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/etudiants/checkTags`,formJSON,{
            headers: {
                Authorization: `Bearer ${token}` 
            }
        });
        
        return response.data;
    }catch(error){
        console.error('une erreur est survenue lors ', error);
        throw new Error('une erreur est survenue lors ');
    }

}

export default CheckIfEtudiantHasTags;
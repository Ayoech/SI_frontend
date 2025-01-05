import axios from'axios';


const fetchEtudiants = async() =>  {

    try{
        const token = localStorage.getItem("token");
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/ecole/etudiants`,{
            headers: {
                Authorization: `Bearer ${token}` 
            }
        });
        return response.data;
    }catch(error){
        console.error('une erreur est survenue lors de la recherche des étudiants', error);
        throw new Error('une erreur est survenue lors de la recherche des étudiants');
    }

}

export default fetchEtudiants;
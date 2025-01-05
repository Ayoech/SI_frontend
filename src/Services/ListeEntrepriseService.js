import axios from'axios';


const fetchEntreprises = async() =>  {

    try{
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/ecole/entreprises`);
        return response.data;
    }catch(error){
        console.error('une erreur est survenue lors de la recherche des entreprises', error);
        throw new Error('une erreur est survenue lors de la recherche des entreprises');
    }

}

export default fetchEntreprises;
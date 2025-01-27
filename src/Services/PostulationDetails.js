import axios from'axios';


const fetchPostulationDetails = async() =>  {

    try{
        console.log('begin')
        const token = localStorage.getItem("token");
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/ecole/postulationdetails`,{
            headers: {
                Authorization: `Bearer ${token}` 
            }});
            console.log(response)
        return response.data;
    }catch(error){
        console.error('une erreur est survenue lors de la recherche des détails de la postulation', error);
        throw new Error('une erreur est survenue lors de la recherche des détails de la postulation');
    }

}

export default fetchPostulationDetails;
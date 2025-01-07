import axios from'axios';


const FetchOffresPourEtudiant = async() =>  {

    try{
        const user = JSON.parse(localStorage.getItem("user"));
        const token = localStorage.getItem("token");
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/etudiants/offres`,{
            headers: {
                Authorization: `Bearer ${token}` 
            }
        });
        return response.data;
    }catch(error){
        console.error("une erreur est survenue lors de la recherche des données des offres l'étudiant", error);
        throw new Error("une erreur est survenue lors de la recherche des données des offres l'étudiant");
    }

}

export default FetchOffresPourEtudiant


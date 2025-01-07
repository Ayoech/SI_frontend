import axios from'axios';


const RecupererPasswordService = async(num_utilisateur) =>  {

    try{
        const objet = {id: num_utilisateur}
        const token = localStorage.getItem("token");
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/ecole/recuperer_mot_de_passe`,objet,{
            headers: {
                Authorization: `Bearer ${token}` 
            }
        });
        return response;
    }catch(error){
        console.error('une erreur est survenue lors de la récupération du mot de passe', error);
        throw new Error('une erreur est survenue lors de la récupération du mot de passe ');
    }

}

export default RecupererPasswordService;
import axios from'axios';


const DesactiverCompteService = async(num_utilisateur) =>  {

    try{
        const objet = {id: num_utilisateur}
        const token = localStorage.getItem("token");
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/ecole/desactiverCompte`,objet,{
            headers: {
                Authorization: `Bearer ${token}` 
            }
        });
        return response;
    }catch(error){
        console.error('une erreur est survenue lors de la désactivation du compte', error);
        throw new Error('une erreur est survenue lors de la désactivation du compte ');
    }

}

export default DesactiverCompteService;
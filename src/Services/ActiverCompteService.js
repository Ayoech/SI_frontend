import axios from'axios';


const ActiverCompteService = async(num_utilisateur) =>  {

    try{
        const objet = {id: num_utilisateur}
        const token = localStorage.getItem("token");
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/ecole/activerCompte`,objet,{
            headers: {
                Authorization: `Bearer ${token}` 
            }
        });
        return response;
    }catch(error){
        console.error('une erreur est survenue lors de l\'activation du compte', error);
        throw new Error('une erreur est survenue lors de l\'activation du compte ');
    }

}

export default ActiverCompteService;
import axios from'axios';


const creerEntreprise = async(formJSON) =>  {

    try{
        const token = localStorage.getItem("token");
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/ecole/creerEntreprise`,formJSON,{
            headers: {
                Authorization: `Bearer ${token}` 
            }
        });
        return response;
    }catch(error){
        console.error('une erreur est survenue lors de la création du compte Entreprise', error);
        throw new Error('une erreur est survenue lors de la création du compte Entreprise');
    }

}

export default creerEntreprise;
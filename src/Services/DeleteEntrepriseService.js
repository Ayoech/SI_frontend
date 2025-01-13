import axios from'axios';


const DeleteEntrepriseService = async(formJSON) =>  {

    try{
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));
        form ={
            num_utilisateur:user.userId
        }
        const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/v1/ecole/deleteEntreprise`,form,{
            headers: {
                Authorization: `Bearer ${token}` 
            }
        });
        return response;
    }catch(error){
        console.error('une erreur est survenue lors de la suppression de l\'entreprise', error);
        throw new Error('une erreur est survenue lors de la suppression de l\'entreprise');
    }

}

export default DeleteEntrepriseService;
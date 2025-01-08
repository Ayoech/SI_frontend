import axios from'axios';


const MettreAJourEtatAcceptation = async(etat,num_postulation) =>  {

    try{
        const formJSON ={
            etat:etat,
            num_postulation:num_postulation
        }
        const token = localStorage.getItem("token");
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/ecole/mettreAjourEtatAcceptation`,formJSON,{
            headers: {
                Authorization: `Bearer ${token}` 
            }
        });
        return response;
    }catch(error){
        console.error('une erreur est survenue lors de la création du compte etudiant', error);
        throw new Error('une erreur est survenue lors de la création du compte etudiant');
    }

}

export default MettreAJourEtatAcceptation;
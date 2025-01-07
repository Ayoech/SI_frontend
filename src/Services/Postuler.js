import axios from'axios';


const Postuler = async(offerId,lettre_motivation) =>  {

    try{
        const user = JSON.parse(localStorage.getItem("user"));
        const token = localStorage.getItem("token");
        const formJSON = {
            num_offre: offerId,
            num_etudiant: user.userId, 
            lettre_motivation: lettre_motivation
        };
        console.log("formeJSON: ",offerId)
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/etudiants/postulerStage`,formJSON,{
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

export default Postuler;
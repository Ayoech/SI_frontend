import axios from'axios';


const RefuserAccepterEntretien = async(reponse,num_postulation) =>  {

    try{
        const user = JSON.parse(localStorage.getItem("user"));
        const token = localStorage.getItem("token");
        const formJSON = {
            num_postulation: num_postulation,
            reponse: reponse, 
        };
        
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/etudiants/accepterRefuserEntretien`,formJSON,{
            headers: {
                Authorization: `Bearer ${token}` 
            }
        });
        return response;
    }catch(error){
        console.error('une erreur est survenue ', error);
        throw new Error('une erreur est survenue ');
    }

}

export default RefuserAccepterEntretien;
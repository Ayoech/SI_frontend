import axios from 'axios'

const CreateOffre = async(formJSON) =>{
    try{
        const user = JSON.parse(localStorage.getItem("user"));
        const token = localStorage.getItem('token');
        formJSON.num_utilisateur = user.userId;

        const response = await axios.post(`http://localhost:3000/api/v1/entreprise/offers`, formJSON,{
            headers: {
            Authorization: `Bearer ${token}`,
            }
        });

        return response.data

    }catch(error){
        console.error("an error: ", error)
    }
}

export default CreateOffre;
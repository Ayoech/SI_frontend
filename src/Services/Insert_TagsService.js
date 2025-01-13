import axios from'axios';


const insert_TagsService = async(tags) =>  {

    try{
        const user = JSON.parse(localStorage.getItem("user"));
        const token = localStorage.getItem("token");
        const formJSON = {
            tags:tags,
            num_utilisateur: user.userId
        };
        
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/etudiants/insertTags`,formJSON,{
            headers: {
                Authorization: `Bearer ${token}` 
            }
        });
        
        return response.data;
    }catch(error){
        console.error('une erreur est survenue lors ', error);
        throw new Error('une erreur est survenue lors ');
    }

}

export default insert_TagsService;
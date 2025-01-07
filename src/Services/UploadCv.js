import axios from "axios";



const UploadCv = async (file) => {
    if (!(file instanceof File) || file.type !== 'application/pdf') {
        throw new Error('Le fichier doit être un PDF valide');
    }

    try {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('cv', file);
        formData.append('num_utilisateur', user.userId);

        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/etudiants/uploadCV`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });

        return response;
    } catch (error) {
        console.error('Erreur lors de l\'enregistrement du cv', error);
        throw new Error('Une erreur est survenue lors de l\'enregistrement du cv');
    }
};


export default UploadCv;
import axios from "axios";



const CreerConvention = async (file) => {
    if (!(file instanceof File) || file.type !== 'application/pdf') {
        throw new Error('Le fichier doit être un PDF valide');
    }

    try {
        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('pdf', file);

        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/ecole/creerConvention`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });

        return response;
    } catch (error) {
        console.error('Erreur lors de la création de la convention', error);
        throw new Error('Une erreur est survenue lors de la création de la convention');
    }
};

export default CreerConvention;
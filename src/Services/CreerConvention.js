import axios from "axios";



const CreerConvention = async (num_postulation,titre, nom_etudiant, nom_entreprise, prenom_etudiant,
    date_debut, date_fin, filiere, addresse) => {
    
    try {
        const token = localStorage.getItem('token');
        const object ={
                        num_postulation:num_postulation,
                        titre:titre,
                        nom_etudiant:nom_etudiant,
                        nom_entreprise: nom_entreprise,
                        prenom_etudiant: prenom_etudiant,
                        date_debut:date_debut,
                        date_fin:date_fin,
                        filiere:filiere,
                        addresse:addresse,
        }
        
        console.log('objet',object)

        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/ecole/creerConvention`, object, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error('Erreur lors de la création de la convention', error);
        throw new Error('Une erreur est survenue lors de la création de la convention');
    }
};

export default CreerConvention;
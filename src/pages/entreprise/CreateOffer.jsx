import React, { useState, useEffect } from 'react';
import Header from '../../Header';
import Sideent from '../../Sideent';
import CreateOffre from  '../../Services/CreateOffre' 
import Spinner from '../../components/Spinner';

const CreateOffer = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(true);
  const [step, setStep] = useState(1);
  const [offerData, setOfferData] = useState({
    titre: '',
    description: '',
    date_debut: '',
    date_fin: '',
    tags: [],
    competences: [''],
    qualifications: ['','',''],
  });
  const [numUtilisateur, setNumUtilisateur] = useState(null);
  const [errorMessage, setErrorMessage] = useState(''); 
  const [successMessage, setSuccessMessage] = useState(''); 
  const [loading,setLoading] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  
  /*useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('JWT token not found. Please login.');
      
      return;
    }

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user && user.userId) {
        setNumUtilisateur(user.userId);
      } else {
        console.error('num_utilisateur not found in token.');
      }
    } catch (error) {
      console.error('Error decoding token:', error.message);
    }
  }, []);*/

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setOfferData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleTagChange = (tagId) => {
    setOfferData((prevData) => {
      const tags = prevData.tags.includes(tagId)
        ? prevData.tags.filter((t) => t !== tagId)
        : [...prevData.tags, tagId];
      return { ...prevData, tags: tags.slice(0, 3) }; 
    });
  };

  const handleAddQualification = (qualification) => {
    if (qualification && offerData.qualifications.length < 5) {
      setOfferData((prevData) => ({
        ...prevData,
        qualifications: [...prevData.qualifications, qualification],
      }));
    }
  };

  const handleQualificationChange = (index,value) => {
    setOfferData((prevData) => {
      const updatedQualifications = [...prevData.qualifications];
      updatedQualifications[index] = value;
      return { ...prevData, qualifications: updatedQualifications };
    });
  };

  const handleAddQualificationFromInput = () => {
    
      if(offerData.qualifications.length<5){
      setOfferData((prevData) => ({
        ...prevData,
        qualifications: [...prevData.qualifications, ''],
      }));
    }
    };

  const handleRemoveQualification = (index) => {
    setOfferData((prevData) => ({
      ...prevData,
      qualifications: prevData.qualifications.filter((_, i) => i !== index),
    }));
  };

  const handleCompetenceChange = (index, value) => {
    setOfferData((prevData) => {
      const updatedCompetences = [...prevData.competences];
      updatedCompetences[index] = value;
      return { ...prevData, competences: updatedCompetences };
    });
  };
  
  const addCompetenceInput = () => {
    if(offerData.competences.length<5){
    setOfferData((prevData) => ({
      ...prevData,
      competences: [...prevData.competences, ''],
    }));
  }
  };
  
  
  /*const removeCompetenceInput = (index) => {
    setOfferData((prevData) => ({
      ...prevData,
      competences: prevData.competences.filter((_, i) => i !== index),
    }));
  };*/
  const removeCompetenceInput = (index) => {
    if (offerData.competences.length > 1) {  // Prevent removing the last field
      setOfferData((prevData) => ({
        ...prevData,
        competences: prevData.competences.filter((_, i) => i !== index),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setLoading(true)
  
    const payload = {
      ...offerData,
      
    };
  
    try {
      await CreateOffre(payload);
      setSuccessMessage('Offer created successfully!');
      setOfferData({
        titre: '',
        description: '',
        date_debut: '',
        date_fin: '',
        tags: [],
        competences: [''],
        qualifications: ['','',''],
      });
      setStep(1);
    } catch (error) {
      setErrorMessage('Failed to create offer. Please try again later.');
    }finally{
      setErrorMessage('');
    setSuccessMessage('');
    setLoading(false)
    }
  };

  const availableTags = [
    
    { id: 21, name: 'Frontend Developer' },
    { id: 22, name: 'Backend Developer' },
    { id: 23, name: 'Full Stack Developer' },
    { id: 24, name: 'Software Engineer' },
    { id: 25, name: 'Artificial Intelligence Engineer' },
    { id: 26, name: 'Machine Learning Engineer' },
    { id: 27, name: 'Deep Learning Engineer' },
    { id: 28, name: 'DevOps Engineer' },
    { id: 29, name: 'Mobile Developer' },
    { id: 30, name: 'Data Scientist' },
    { id: 31, name: 'Data Analyst' },
    { id: 32, name: 'Big Data Engineer' },
    { id: 33, name: 'Security Engineer' },
    { id: 34, name: 'Security Architect' },
    { id: 35, name: 'Data Engineer' },
    { id: 36, name: 'UI/UX Designer' },
    { id: 37, name: 'Cloud Computing Practitioner' },
    { id: 38, name: 'Cloud Computing Developer' }
  ];
  

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <div className='flex mb-4'>
              <div>
              <label htmlFor="titre">Titre</label><br></br>
              <input
                type="text"
                name="titre"
                value={offerData.titre}
                onChange={handleChange}
                className="mt-1 p-2 mr-2 w-full border border-gray-300 rounded mb-8"
                style={{ width: '400px' }}
              />
              <br></br>
              <label htmlFor="date_debut">Date Début</label><br></br>
              <input
                type="date"
                name="date_debut"
                value={offerData.date_debut}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded mb-8"
                style={{ width: '400px' }}
              />
               <br></br>
              <label htmlFor="date_fin">Date Fin</label><br></br>
              <input
                type="date"
                name="date_fin"
                value={offerData.date_fin}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded"
                style={{ width: '400px' }}
              />
            </div>
              <div>
              <label htmlFor="description">Description</label><br></br>
              <textarea
               
                name="description"
                value={offerData.description}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded"
                style={{ width: '400px',height:'255px' }}
              />
            </div>
            </div>
            
            
            
          </>
        );
      case 2:
        
        
        

        return (
          <>
          <div className='mb-4 pb-4'> 
            <p className='mb-2 pb-2 text-xl font-semibold'>Select up to 3 tags and minimum 1:</p>
            {availableTags.map((tag) => (
            <button
              type="button"
              key={tag.id}
              onClick={() => handleTagChange(tag.id)}
              className={offerData.tags.includes(tag.id) ?
                 `selected ml-2 bg-blue-500 text-white border border-blue-700
                  rounded-lg px-4 py-2 cursor-pointer hover:bg-blue-600 transition`
                   : `border border-blue-700
                  rounded-lg py-2 px-4 ml-2 mb-2`}
            >
            {tag.name}
            </button>
          ))}
          {/*<p>Selected tags: {offerData.tags.map((id) => availableTags.find((tag) => tag.id === id)?.name).join(', ')}</p>*/}
          </div>
          <div>
            <p className='mb-2 pb-2 text-xl font-semibold'>Ajouter des compétences:</p>
            {offerData.competences.map((competence, index) => (
            <div key={index} className="flex items-center space-x-2 mt-2">
            <input
              type="text"
              value={competence}
              onChange={(e) => handleCompetenceChange(index, e.target.value)}
              placeholder={`Compétence ${index + 1}`}
              className="p-2 border border-gray-300 rounded w-1/2"
            />
            <button
              type="button"
              onClick={() => removeCompetenceInput(index)}
              className={`px-2 py-1 rounded ${offerData.competences.length === 1 ? 'bg-gray-300 text-gray-600' : 'bg-red-500 text-white'}`}
              disabled={offerData.competences.length === 1}
            >
              Supprimer
            </button>
          </div>
            ))}
          <button
            type="button"
            onClick={addCompetenceInput}
            className={`px-4 py-2 rounded mt-4 
              ${offerData.competences.length === 5 ?
                 'bg-gray-500 text-gray-300' : 'bg-black text-white'}`}
            disabled={offerData.competences.length>=5}
          >
            Ajouter une compétence
          </button>
       </div>

          </>
        );
      case 3:
        return (
          <>
           <div className='mt-4 flex '>
             <div className=''>
            <p className='mb-2 pb-2 text-xl font-semibold'>Add qualifications (3 to 5):</p>
            {offerData.qualifications.map((qualification, index) => (
              <div key={index} className='qualif-grid'>
                
                <input
                type="text"
                placeholder={`Qualification ${index + 1}`}
                onChange={(e) => handleQualificationChange(index, e.target.value)}
                className="mt-1 p-2 w-full border border-gray-300 rounded mr-2"
                style={{ width: '400px' }}
              />
                
                <button className={`px-2 py-1 rounded ${offerData.qualifications.length === 3 ? 'bg-gray-300 text-gray-600' : 'bg-red-500 text-white'}`}
              disabled={offerData.qualifications.length === 3} onClick={() => handleRemoveQualification(index)}>Supprimer</button>
                  
              </div>
            ))}
            
            <button
            type="button"
            onClick={handleAddQualificationFromInput}
            className={`px-4 py-2 rounded mt-4 
              ${offerData.qualifications.length === 5 ?
                 'bg-gray-500 text-gray-300' : 'bg-black text-white'}`}
            disabled={offerData.qualifications.length>=5}
          >
            Ajouter une qualification
          </button>
            </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} />
      <Sideent openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      <div className={`createOffer-Form flex justify-center items-start ${
          openSidebarToggle ? '' : ''
        }`}>
        <div className="rounded-lg p-8 ml-28 mt-8 max-w-6xl" >
        <form onSubmit={handleSubmit}>
          {renderStepContent()}
          <div>
            <div className='flex justify-between mt-8'>
              <div>
                {step > 1 && <button type='button'  className='bg-black text-white rounded px-4 py-2'
                 onClick={() => setStep(step - 1)}>Back</button>}
              </div>
              <div className='flex justify-between'>
                <span>
                  {step < 3 && <button type='button' 
                   className='bg-black text-white rounded px-4 py-2' onClick={() => setStep(step + 1)}>Next</button>}
                </span>
                <span>
                  {step === 3 && <button className={`${loading? 'bg-black text-gray-600 px-6 py-2 rounded':'bg-black text-white rounded px-4 py-2'}`} 
                  type="submit" disabled={loading}>{loading?<Spinner/>:'Submit'}</button>}
                </span>
              </div>
            </div>
            
          </div>
        </form>
        </div>
        {successMessage && <p>{successMessage}</p>}
        {errorMessage && <p>{errorMessage}</p>}
      </div>
    </div>
  );
};

export default CreateOffer;

import React, { useState } from 'react'
import insert_TagsService from '../../Services/Insert_TagsService';
import { useNavigate } from 'react-router-dom';

const Tags = () => {
    const [offerData,setOfferData]=useState({
        tags:[],
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleTagChange = (tagId) => {
      setOfferData((prevData) => {
          const tags = prevData.tags.includes(tagId)
              ? prevData.tags.filter((t) => t !== tagId)
              : [...prevData.tags, tagId];
              if (tags.length > 5) {
                setError('You can only select up to 3 tags.');
                return prevData; 
              } else {
                setError(''); 
                return { ...prevData, tags };
              } 
      });
  };

      const handleSubmit = async (e) => {
        e.preventDefault();
        if (offerData.tags.length < 1) {
          setError('Please select at least one tag.');
          return;
      }
        setError('');
        setLoading(true);
        try{
            await insert_TagsService(offerData);
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
            navigate('/student/Profile');
        }catch(error) {
          console.error(error);
          setError('Failed to insert tags. Please try again.');
        }finally {
          setLoading(false);
        }
      };
      
    const availableTags=[
    
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
        { id: 38, name: 'Cloud Computing Developer' },
        { id: 39, name: 'Blockchain Developer'},
    { id: 40, name:  'Supply Chain Analyst'},
    { id: 41, name: 'Cybersecurity Analyst'},
    { id: 42, name: 'IoT Developer'},
    { id: 43, name: 'IT Consultant'},
    { id: 44, name: 'Technical Project Manager'},
    { id: 45, name: 'Quality Assurance Engineer'}
      ];
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-opacity-50 bg-gray-500">
        <div className='mt-16 mb-4 pb-4 bg-white p-8 rounded-lg shadow-lg  ' style={{width:'1000px'}}> 
            <p className='mb-2 pb-2 text-xl font-semibold'>Vous pouvez sélectionner de 1 à 5 tags:</p>
            <div className="flex flex-wrap">
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
          </div>
          {error && <p className="text-red-500 mt-4">{error}</p>}
          {success && <p className="text-green-500 mt-4">Enregistrement a été fait avec succès!</p>}
          <button
            type="submit"
            onClick={(event) => handleSubmit(event)}
            className="px-4 py-2 rounded text-white bg-black"
            disabled={loading}
          >{loading ? 'Enregistrement...' : 'Enregistrer'}</button>
          {/*<p>Selected tags: {offerData.tags.map((id) => availableTags.find((tag) => tag.id === id)?.name).join(', ')}</p>*/}
          </div>
    </div>
  )
}

export default Tags
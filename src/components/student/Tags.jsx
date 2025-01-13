import React, { useState } from 'react'

const Tags = () => {
    const [offerData,setOfferData]=useState({
        tags:[],
    })

    const handleTagChange = (tagId) => {
        setOfferData((prevData) => {
          const tags = prevData.tags.includes(tagId)
            ? prevData.tags.filter((t) => t !== tagId)
            : [...prevData.tags, tagId];
          return { ...prevData, tags: tags.slice(0, 3) }; 
        });
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
        <div className='mb-4 pb-4 bg-white p-8 rounded-lg shadow-lg max-w-lg w-full'> 
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
    </div>
  )
}

export default Tags
import React from 'react';
import PostulationForme from './PostulationForme';
import { X } from 'lucide-react';

const PostulationFormeBox = ({togglePostulationForme,offerId}) => {

    

  return (
    <div className="max-w-md  rounded-lg shadow-sm bg-white" >
      <button className="text-gray-400 hover:text-gray-500" onClick={togglePostulationForme}>
        <X className="h-7 w-7 text-black hover:text-red-600"  />
      </button>
      <PostulationForme offerId={offerId}/>
    </div>
  )
}

export default PostulationFormeBox
import React from 'react';
import PostulationForme from './PostulationForme';
import { X } from 'lucide-react';

const PostulationFormeBox = ({togglePostulationForme}) => {

    

  return (
    <div className="max-w-md border border-gray-200 rounded-lg shadow-sm bg-white" >
      <button className="text-gray-400 hover:text-gray-500" onClick={togglePostulationForme}>
        <X className="h-5 w-5" />
      </button>
      <PostulationForme/>
    </div>
  )
}

export default PostulationFormeBox
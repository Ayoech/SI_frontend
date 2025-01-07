import { MoreVertical, ArrowRight } from 'lucide-react'
import React from 'react'

const BOX=React.memo(({ 
  title, 
  company, 
  location, 
  type, 
  simplified = true ,
  handleBoxClick
}) =>{

  
  return (
    <div className="max-w-md border border-gray-200 rounded-lg shadow-sm bg-white" >
      <div className="flex flex-row items-start justify-between p-6 pb-2">
        <div className="space-y-1 pr-10">
          <h3 className="font-semibold text-xl text-gray-900 leading-tight">
            {title}
          </h3>
          <div className="space-y-1">
            <p className="text-base text-gray-700">{company}</p>
            <p className="text-base text-gray-700">{location}</p>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-500">
          <MoreVertical className="h-5 w-5" />
        </button>
      </div>
      <div className="px-6 pb-6">
        <div className="flex flex-col gap-3">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-gray-800">
            {type}
          </span>
          {simplified && (
            <button className="flex items-center text-blue-600 font-semibold hover:underline" onClick={handleBoxClick}>
              <ArrowRight className="mr-2 h-4 w-4" />
              Voir les détails
            </button>
          )}
        </div>
      </div>
    </div>
  )
})

export default BOX

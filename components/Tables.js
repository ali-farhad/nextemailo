import React from 'react'

const Tables = () => {
  return (
    <div>
        <div className="overflow-x-auto">
  <table className="min-w-[1000px] mx-auto text-sm divide-y divide-gray-200 mb-10">
    <thead>
      <tr>
        
        <th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">
          <div className="flex items-center">
            Email Address
           
          </div>
        </th>
        <th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">
          <div className="flex items-center">
            Status
            
          </div>
        </th>
       
      
      </tr>
    </thead>

    <tbody className="divide-y divide-gray-100">
      <tr>
       
        <td className="p-4 text-gray-700 whitespace-nowrap">john.doe@email.com</td>
        <td className="p-4 text-gray-700 whitespace-nowrap">
        <strong
            className="bg-red text-white px-3 py-1.5 rounded text-xs font-medium"
          >
            Invalid
          </strong>
        </td>
      </tr>

      <tr>
      
        <td className="p-4 text-gray-700 whitespace-nowrap">jane.doe@email.com</td>
        <td className="p-4 whitespace-nowrap">
          <strong
            className="bg-green-100 text-green-700 px-3 py-1.5 rounded text-xs font-medium"
          >
            Valid
          </strong>
        </td>
      </tr>

    
    </tbody>
  </table>
</div>
    </div>
  )
}

export default Tables
import React from 'react'

const Error = () => {
  return (
    <div>
        <div className="flex items-center justify-center h-screen">
      <div className="p-1 rounded shadow-lg bg-gradient-to-r from-cyan via-sky-500 to-sky-900">
        <div className="flex flex-col items-center p-8 space-y-5 bg-white">
        
        <svg xmlns="http://www.w3.org/2000/svg" className="text-red w-28 h-28" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16"> <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/> <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/> </svg>

          <h1 className="text-4xl font-bold font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">ERROR</h1>
          <p>Something Weng Wrong! Please Try Again Later After Sometime!😣</p>
          <a
            className="inline-flex items-center px-4 py-2 text-white bg-cyan rounded rounded-full hover:bg-indigo-700 focus:outline-none focus:ring">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 mr-2" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" strokeWidth="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            <span className="text-sm font-medium">
              Dashboard
            </span>
          </a>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Error
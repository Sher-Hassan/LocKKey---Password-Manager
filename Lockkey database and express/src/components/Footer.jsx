import React from 'react'

const Footer = () => {
  return (
    <div className='bg-slate-800 fixed bottom-0 w-full text-white py-2 flex flex-col justify-center items-center'>
        <div className='logo font-bold text-2xl'>
          <span className="text-green-500">&lt;</span>
           LocK
          <span className="text-green-500">Key/ &gt;</span> 
           </div>
           <h1>Created with <span className='font-bold text-red-600'>LOVE</span> by Sher Hassan.</h1>
    </div>
  )
}

export default Footer
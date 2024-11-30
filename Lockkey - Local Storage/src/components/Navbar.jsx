import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white'>
      <div className="mycontainer flex justify-between items-center p-4 h-15">
        <div className='logo font-bold text-2xl'>
          <span className="text-green-500">&lt;</span>
           LocK
          <span className="text-green-500">Key/ &gt;</span> 
           </div>
        <ul>
            <li className='flex gap-4 justify-between'>
                <a className='transform transition-transform duration-200 hover:scale-110' href="/">Home</a>
                <a className='transform transition-transform duration-200 hover:scale-110' href="#">About</a>
                <a className='transform transition-transform duration-200 hover:scale-110' href="#">Contact</a>
            </li>
        </ul>
        <a target='_blank' href="https://github.com/Sher-Hassan"><button className='bg-green-900 rounded-3xl text-white flex gap-1 justify-center items-center px-2 border border-green-950 font-bold hover:scale-105 transition-all 0.2 ease'>
          <img className='invert w-11 h-11' src="/icons/github.svg" alt="" />
          <span>GitHub</span>
        </button></a>
        </div>
    </nav>
  )
}

export default Navbar
import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { adminContext } from '../context/adminContext'
import { useNavigate} from 'react-router-dom'
import { doctorcontext } from '../context/doctorContext'

const Navbar = () => {
    const navigate = useNavigate();

const {atoken,setatoken} = useContext(adminContext);
const {dToken,setDtoken} = useContext(doctorcontext);

const logout = ()=>{
    atoken && setatoken('');
    atoken && localStorage.removeItem('atoken')
    dToken && setDtoken('');
    dToken && localStorage.removeItem('dToken')
}

  return (
    <div className='flex justify-between px-4 py-4 items-center border border-b sm:px-10 bg-white'>
       <div className='flex items-center text-xs gap-2'>
        <img className='w-36 sm:w-40 cursor-pointer ' src={assets.admin_logo}/>
        <p className='border px-2 rounded-full py-0.5 border-gray-500 text-gray-600'>{atoken ?'Admin' : 'Doctor'}</p>
       </div>
       <button onClick={logout} className='bg-[#5F6FFF] cursor-pointer text-white text-sm px-10 py-2 rounded-full animate-pulse'>Logout</button>
    </div>
  )
}

export default Navbar

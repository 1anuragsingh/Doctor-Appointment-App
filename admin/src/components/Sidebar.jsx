import React from 'react'
import { useContext } from 'react'
import { adminContext } from '../context/adminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { doctorcontext } from '../context/doctorContext'

const Sidebar = () => {
    const {atoken} = useContext(adminContext)
    const {dToken} = useContext(doctorcontext)
  return (
    <div className='min-h-screen bg-white border-r'>
      {
        atoken &&
        <ul className='text-[#515151] mt-5'>
            <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer  ${isActive ? 'border-r-4 bg-[#F2F3FF] border-[#5F6FFF]' : null} `} to={'/admin-dashboard'}>
                <img src={assets.home_icon}></img>
                <p className='hidden md:block'>Dashboard</p>
            </NavLink>
            <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer  ${isActive ? 'border-r-4 bg-[#F2F3FF] border-[#5F6FFF]' : null} `} to={'/all-appointments'}>
                <img src={assets.appointment_icon}></img>
                <p className='hidden md:block'>Appointments</p>
            </NavLink>
            <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer  ${isActive ? 'border-r-4 bg-[#F2F3FF] border-[#5F6FFF]' : null} `} to={'/add-doctor'}>
                <img src={assets.add_icon}></img>
                <p className='hidden md:block'> Add Doctor</p>
            </NavLink>
            <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer  ${isActive ? 'border-r-4 bg-[#F2F3FF] border-[#5F6FFF]' : null} `} to={'/doctors-list'}>
                <img src={assets.people_icon}></img>
                <p className='hidden md:block'>Doctors List</p>
            </NavLink>
        </ul>
      }
      {
        dToken &&
        <ul className='text-[#515151] mt-5'>
            <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer  ${isActive ? 'border-r-4 bg-[#F2F3FF] border-[#5F6FFF]' : null} `} to={'/doctor-dashboard'}>
                <img src={assets.home_icon}></img>
                <p className='hidden md:block' >Dashboard</p>
            </NavLink>
            <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer  ${isActive ? 'border-r-4 bg-[#F2F3FF] border-[#5F6FFF]' : null} `} to={'/doctor-appointments'}>
                <img src={assets.appointment_icon}></img>
                <p className='hidden md:block'>Appointments</p>
            </NavLink>
            <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer  ${isActive ? 'border-r-4 bg-[#F2F3FF] border-[#5F6FFF]' : null} `} to={'/doctor-profile'}>
                <img src={assets.people_icon}></img>
                <p className='hidden md:block'>Profile</p>
            </NavLink>
        </ul>
      }
    </div>
  )
}

export default Sidebar

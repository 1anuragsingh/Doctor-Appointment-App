import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div className='flex flex-col md:flex-row flex-wrap bg-[#5f6FFF] px-6 md:px-10 lg:px-15 rounded-lg'>
    {/*left side*/ }
    <div className='md:w-1/2 flex flex-col justify-center items-start m-auto md:py-[10vw] md:mb-[-30px] gap-4 py-10'>
        <p className='text-white text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight md:leading-tight lg:leading-tight'>
            Book Appointments <br /> With Trusted Doctors
        </p>
        <div className='flex items-center text-white flex-col md:flex-row gap-3 text-sm  font-light'>
            <img className='w-28' src = {assets.group_profiles}></img>
            <p> Simply browse through our extensive list of trusted doctors,<br className='hidden sm:block'/>
schedule your appointment hassle-free.</p>
        </div>
        <a className='flex h-auto p-3 md:m-0  w-48 items-center justify-center text-gray-800  bg-white rounded-full  text-sm font-light hover:scale-110 transition-all duration-400' href='#speciality'>
           Book Appointment  <img className='px-2'src = {assets.arrow_icon} alt = "arrow" />
        </a>
</div>
{/*right side*/}
<div className='md:w-1/2  relative'>
<img className='w-full md:absolute bottom-0 rounded-lg h-auto' src = {assets.header_img} alt = "header" />
</div>
    </div>
  )
}

export default Header
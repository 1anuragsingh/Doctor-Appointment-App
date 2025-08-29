import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div>
      
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>CONTACT <span className='text-gray-700  font-semibold'>US</span></p>
      </div>

      <div className='flex felx-col md:flex-row justify-center my-10 gap-20  text-sm mb-20'>
        <img className='w-full md:max-w-[360px] rounded-xl' src={assets.contact_image}></img>
        <div className='flex flex-col justify-center items-start gap-6 text-gray-700'>
          <p className='text-lg font-semibold text-gray-600'>OUR OFFICE</p>
          <p className='text-gray-500'>00000 Willms Station <br></br>
Suite 000, Washington, USA</p>
          <p className='text-gray-500'>Tel: (000) 000-0000 <br></br>
Email: anuragSingh@gmail.com</p>
          <p className='text-lg font-semibold text-gray-600'>CAREERS AT PRESCRIPTO</p>
          <p className='text-gray-500'>Learn more about our teams and job openings.</p>
          <button className='border border-black px-9 py-4 hover:text-white hover:bg-black duration-300 cursor-pointer'>Explore Jobs</button>
        </div>
      </div>
    </div>
  )
}

export default Contact
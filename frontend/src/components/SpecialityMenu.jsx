import React from 'react'
import { specialityData} from '../assets/assets'  
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
  return (
    <div id = 'speciality' className='flex flex-col items-center py-16 gap-4'>
        <h1 className='text-3xl font-bold'>Find by Speciality</h1>
        <p className='text-sm p-4 text-center'>Simply browse through our extensive list of trusted doctors,<br/> schedule your appointment hassle-free.</p>
        <div className='flex w-full gap-4 overflow-scroll pt-5 justify-center'>
            {specialityData.map((item,index)=> {
               return <Link key={index} className='flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500' to={"doctors"+item.speciality}>
                <img className='w-16 md:w-24 ' src={item.image}></img>
                <p className='text-sm font-light '>{item.speciality}</p>
                </Link>
            }
                
            )}
        </div>
    </div>
  )
}

export default SpecialityMenu
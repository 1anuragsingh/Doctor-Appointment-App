import React from 'react'
import { useContext } from 'react'
import { adminContext } from '../../context/adminContext'
import { useEffect } from 'react';
import { assets } from '../../assets/assets';
import { Appcontext } from '../../context/appContext';

const Dashboard = () => {
  const { atoken, dashData, getDashData, cancelAppointment } = useContext(adminContext);
  const {dateFormat} = useContext(Appcontext)

  useEffect(() => {
    if (atoken) getDashData();
  }, [atoken])

  return dashData && (
    <div className='m-5'>
      <div className='flex flex-wrap gap-3'>
        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-200 hover:scale-105 transition-all duration-300'>
          <img className='w-14' src={assets.doctor_icon}></img>
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.doctors}</p>
            <p className='text-gray-400'>Doctors</p>
          </div>
        </div>
        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-200 hover:scale-105 transition-all duration-300'>
          <img className='w-14' src={assets.patients_icon}></img>
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.patients}</p>
            <p className='text-gray-400'>Patients</p>
          </div>
        </div>
        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-200 hover:scale-105 transition-all duration-300'>
          <img className='w-14' src={assets.appointments_icon}></img>
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.appointments}</p>
            <p className='text-gray-400'>Appointments</p>
          </div>
        </div>
      </div>
      <div className='bg-white'>
        <div className='flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border'>
          <img src={assets.list_icon}></img>
          <p className='font-semibold'>Latest Bookings</p>
        </div>
        <div className='pt-4 border border-t-0'>
          {
            dashData.latestAppointmets.map((item, index) => (
              <div className='flex items-center px-6 py-3 gap-3 hover:bg-gray-100' key={index}>
                <img className='rounded-full w-10' src={item.docData.image}></img>
                <div className=' flex-1 text-sm'>
                  <p className='text-gray-800 font-medium'>{item.docData.name}</p>
                  <p className='text-gray-600 '>{dateFormat(item.slotDate)}</p>
                </div>
                 {item.cancelled ?
          <p className='text-red-400 txt-sm font-medium'>Cancelled</p>
          : item.isCompleted  ? 
           <p className='text-green-400 txt-sm font-medium'>Completed</p> 
           :
          <img onClick={()=>cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon}></img>
          }
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard

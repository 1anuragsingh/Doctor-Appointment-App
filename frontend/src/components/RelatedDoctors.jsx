import React, { useState, useEffect, useContext } from 'react'
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const RelatedDoctors = ({ speciality, docid }) => {
  const { doctors } = useContext(AppContext);

  const navigate = useNavigate();
  const [reldoc, setreldoc] = useState([]);

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const related = doctors.filter(doc => doc.speciality === speciality && doc._id !== docid);
      setreldoc(related); // Get only 4 related doctors
    }
  }, [doctors, speciality, docid]);

  return (
    <div className='flex flex-col items-center py-12 gap-2 text-gray-800 md:mx-8'>
      <h1 className='text-3xl font-medium'>Top Doctors to Book</h1>
      <p className='text-sm p-3 text-center'>Simply browse through our extensive list of trusted <br /> doctors.</p>

      <div className='grid grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] w-full gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
        {reldoc.slice(0, 5).map((doctor, index) => {
          return <div key={index} onClick={() => { navigate(`/appointment/${doctor._id}`); scrollTo(0, 0) }} className='border-2 border-blue-200 rounded-2xl hover:translate-y-[-10px]  duration-500' >
            <img className='bg-blue-100 rounded-t-2xl' src={doctor.image} />
            <div className='flex flex-col   pt-3 '>
              <div className='flex '>
                <div className={` ${doctor.available ? 'bg-green-500' : 'bg-gray-500'} h-2 rounded-full w-2 mt-1.5 ml-3`}></div>
                <p className={`px-3 text-sm ${doctor.available ? 'text-green-500' : 'text-gray-500'}`}>{doctor.available ? "Available" : "Not available"}</p>
              </div>
              <p className='font-semibold text-lg pt-1.5 px-2'>{doctor.name}</p>
              <p className='text-gray-700 text-sm p-2'>{doctor.speciality}</p>
            </div>
          </div>
        })
        }
      </div>
      <button onClick={() => { navigate(`/doctors`); scrollTo(0, 0) }} className='bg-blue-100 px-8 py-3 rounded-3xl text-gray-600 mt-8'>more</button>
    </div>
  )
}

export default RelatedDoctors
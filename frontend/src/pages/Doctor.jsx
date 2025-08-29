import React, { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const Doctor = () => {
  const { speciality } = useParams();
  const { doctors } = useContext(AppContext);
  const [filterdoc, setfilterdoc] = useState([]);

  const navigate = useNavigate();

  const Applyfilter = () => {
    if (speciality) {
      setfilterdoc(doctors.filter(doc => doc.speciality === speciality));
    }
    else {
      setfilterdoc(doctors);
    }
  }

  useEffect(() => {
    Applyfilter();
  }, [speciality, doctors]); // Reapply filter when speciality or doctors change

  return (
    <div>
      <p className='text-gray-600'>Browse through the doctors specialist.</p>
      <div className='flex flex-col md:flex-row items-start gap-5 mt-5'>
        <div className='flex flex-col gap-4 text-sm text-gray-500'>
          <p onClick={() => speciality === 'General physician' ? navigate('/doctors') : navigate('/doctors/General physician')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "General physician" ? "bg-indigo-100 text-balck" : ""}`}>General physician</p>
          <p onClick={() => speciality === 'Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gynecologist" ? "bg-indigo-100 text-balck" : ""}`}>Gynecologist</p>
          <p onClick={() => speciality === 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Dermatologist" ? "bg-indigo-100 text-balck" : ""}`}>Dermatologist</p>
          <p onClick={() => speciality === 'Pediatricians' ? navigate('/doctors') : navigate('/doctors/Pediatricians')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Pediatricians" ? "bg-indigo-100 text-balck" : ""}`}>Pediatricians</p>
          <p onClick={() => speciality === 'Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Neurologist" ? "bg-indigo-100 text-balck" : ""}`}>Neurologist</p>
          <p onClick={() => speciality === 'Gastroenterologist' ? navigate('/doctors') : navigate('/doctors/Gastroenterologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gastroenterologist" ? "bg-indigo-100 text-balck" : ""}`}>Gastroenterologist</p>
        </div>
        <div className='w-full grid grid-cols-2 md:grid-cols-4 gap-4 gap-y-6'>
          {
            filterdoc.map((doctor, index) => (

              <div key={index} onClick={() => navigate(`/appointment/${doctor._id}`)} className='border-2 border-blue-200 rounded-2xl hover:translate-y-[-10px]  duration-500' >
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
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Doctor
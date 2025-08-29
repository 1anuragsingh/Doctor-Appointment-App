import React, { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';

import RelatedDoctors from '../components/RelatedDoctors';
import { toast } from 'react-toastify';
import axios from 'axios';

const Appointment = () => {

  const {docid} = useParams();
  const {doctors , currensymbol,backendUrl,token,getDoctorsData} = useContext(AppContext);
  const daysOfWeek = ['SUN','MON','TUE','WED','THU','FRI','SAT'];

  const navigate = useNavigate();


  const [docslots,setdocslots] = useState([]);
  const [slotIndex,setSlotindex] = useState(0);
  const [slotTime , setSlotime] = useState("");

  const [docinfo, setdocinfo] = useState(null);
  const fetchdocinfo = () => {
    const docinfo = doctors.find(doc => doc._id === docid);
    setdocinfo(docinfo);
  }
  const getavailableSlots = () => {
    setdocslots([])
    //getting current date
    let today = new Date();
    for(let i = 0; i < 7; i++) {

      //getting date with index 
     let currentdate = new Date(today);
     currentdate.setDate(today.getDate()+i);

    // setting end time of the date with index

    let endTime = new Date();
    endTime.setDate(today.getDate()+i)
    endTime.setHours(21,0,0,0);

    // setting hours
    if(today.getDate() == currentdate.getDate()){
      currentdate.setHours(currentdate.getHours()>10 ? currentdate.getHours()+1:10)
      currentdate.setMinutes(currentdate.getMinutes()>30?30:0)
    }else{
      currentdate.setHours(10);
      currentdate.setMinutes(0);
    }
    let timeSlots = [];
     while(currentdate<endTime){
      let fortmattedTime = currentdate.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit',hour12:true});


      let day = currentdate.getDate();
      let month = currentdate.getMonth()+1;
      let year = currentdate.getFullYear();

      const slotDate = day+'_'+month+"_"+year;
      const slotTime =  fortmattedTime;
      const isSlotAvailable = docinfo.slots_booked[slotDate] && docinfo.slots_booked[slotDate].includes(slotTime)  ? false : true;
      
       // add slots to array
     isSlotAvailable && timeSlots.push({
        datetime: new Date(currentdate),
        time : fortmattedTime
       })


       // increment time by 30 min
       currentdate.setMinutes(currentdate.getMinutes()+30)
     }

     setdocslots(prev => ([...prev,timeSlots]))
    }
  }


  const bookAppointment = async()=>{
    if(!token){
      toast.warn("Login to book appointment")
      return navigate('/login')
    }
    try {
      const date = docslots[slotIndex][0].datetime;
      let day = date.getDate();
      let month = date.getMonth()+1;
      let year = date.getFullYear();

      const slotDate = day+'_'+month+"_"+year;
      const { data } =  await axios.post(backendUrl+'/api/user/book-appointment',{docid,slotDate,slotTime},{headers:{token}})

      if(data.success){
        toast.success(data.message)
        getDoctorsData();
        navigate('/my-appointments')
      } else{
       toast.error(data.message)
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
    }

  }


  useEffect(() => { 
    fetchdocinfo();
  }, [docid, doctors]);

  useEffect(() => {
   docinfo && getavailableSlots();
  },[docinfo])

  useEffect(()=>{
    console.log(docslots)
  },[docslots])

  return docinfo && (
    <div >
      {/*doctor details*/}
      <div className='flex flex-col sm:flex-row gap-4'>
      <div>
      <img className='bg-[#5f6FFF] w-full sm:max-w-72 rounded-lg' src = {docinfo.image} alt = "" />
      </div>
      <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
      {/*doc info :name,degree,experience*/}
      <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>{docinfo.name} <img className='w-5' src = {assets.verified_icon} alt = ""/></p>
      <div className='flex items-center gap-2 text-gray-600 mt-1 text-sm '>
        <p>{docinfo.degree} - {docinfo.speciality}</p>
        <button className='py-0.5 px-2 border text-xs rounded-full '>{docinfo.experience}</button>
      </div>
      {/*doc info : about*/}
      <div>
        <p className='flex items-center text-sm gap-1 font-medium text-gray-900 mt-3'>About <img src = {assets.info_icon} /></p>
        <p className='text-sm max-w-[700px] t-1 text-gray-500'>{docinfo.about}</p>
      </div>
      <p className='text-gray-500 font-medium mt-4'>Appointment Fee: <span className='text-gray-600'>{currensymbol}{docinfo.fees}</span> </p>
      </div>
    </div>
      
               {/* booking slots */}

    <div className='sm:ml-72 sm:pl-4 mt-4 font-medium  text-gray-700 '>
      <p>Booking slots</p>
      <div className='flex gap-3  items-center overflow-x-scroll w-full mt-4'>
        {
          docslots.length && docslots.map((item,index)=>(
            <div onClick={()=>setSlotindex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-[#5F6FFF] text-white':'border border-gray-200' }`} key={index}>
               <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
               <p>{item[0] && item[0].datetime.getDate()}</p>
            </div>
          ))
        }
      </div>
      <div className='flex items-center gap-3 w-full overflow-x-scroll  mt-4'>
        {
          docslots.length && docslots[slotIndex].map((item,index)=>(
            <p onClick={()=>setSlotime(item.time)} className={`text-sm font-light  flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-[#5F6FFF] text-white':'border border-gray-200'}`} key={index}> {item.time.toLowerCase()}</p>
          ))

        }
      </div>
      <button onClick={bookAppointment} className='text-white text-sm font-light px-14 py-3 my-6 bg-[#5F6FFF] border border-gray-200 rounded-full '> Book Appointment</button>

      </div>
    {/*listing related dpctors*/}
    <RelatedDoctors docid={docid} speciality={docinfo.speciality}/>
    </div>
  )
}

export default Appointment
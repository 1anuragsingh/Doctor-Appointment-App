import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { adminContext } from '../../context/adminContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { data } from 'react-router-dom';

const AddDoctor = () => {
    const [docimg,setdocimg] = useState(null);
    const [name,setname] = useState("");
    const [email,setemail] = useState("");
    const [password,setpassword] = useState("");
    const [experience,setexperience] = useState("1 Year");
    const [about,setabout] = useState("");
    const [fees,setfess] = useState("");
    const [degree,setdegree] = useState("");
    const [speciality,setspeciality] = useState("General physician");
    const [line1,setline1] = useState("");
    const [line2,setline2] = useState("");

    const {backendUrl,atoken} = useContext(adminContext)

    const onSubmitHandler = async(e)=>{
        e.preventDefault();
        try{
            if(!docimg){
                return toast.error("image not selected")
            }
            
            const formData = new FormData();
            
            formData.append('image',docimg);
            formData.append('name',name);
            formData.append('experience',experience);
            formData.append('password',password);
            formData.append('email',email);
            formData.append('fees',Number(fees));
            formData.append('degree',degree);
            formData.append('speciality',speciality);
            formData.append('address',JSON.stringify({line1:line1,line2:line2}));
            formData.append('about',about);

            const {data }= await axios.post(backendUrl+'/api/admin/add-doctor',formData,{headers:{atoken}})
            if(data.success){
                toast.success('Doctor added succefully')
                setdocimg(null);
                setname('');
                setemail('');
                setpassword("")
                setdegree('')
                setfess('')
                setline1('');
                setline2('')
                setabout('')
            }
            else{
                toast.warn(data.message)
            }
        } catch(error){
            toast.error(data.message)
            console.log(error);
            
        }
    }
  return (
   <form onSubmit={onSubmitHandler} className='m-5 w-full'>
    <p className='mb-3 text-lg font-medium' >Add Doctor</p>
    <div className='bg-white px-8 py-8 border rounded w-full max-w-4xl max-h[80vh] overflow-y-scroll'>
        <div className='flex items-start gap-4 mb-8 text-gray-500'>
            <label htmlFor='doc-img'><img className='w-16 bg-gray-500  rounded-full cursor-pointer' src={docimg ? URL.createObjectURL(docimg) : assets.upload_area}/></label>
            <input onChange={(e)=>setdocimg(e.target.files[0])} type='file' id='doc-img' hidden></input>
            <p>Upload Doctor <br/> picture </p>
        </div>
          <div className='flex flex-col gap-10 lg:flex-row items-start text-gray-600'> 
           <div className='w-full lg:flex-1 flex flex-col gap-4'>
              <div className='flex-1 flex flex-col gap-1'>
                <p>doctor's name</p>
                <input value={name} onChange={(e)=>setname(e.target.value)} className='border rounded px-3 py-2' type='text' placeholder='Name' required/>
            </div>
            <div className='flex-1 flex flex-col gap-1'>
                <p>Doctor email</p>
                <input value={email} onChange={(e)=>setemail(e.target.value)} className='border rounded px-3 py-2' type='email' placeholder='Email' required/>
            </div>
            <div className='flex-1 flex flex-col gap-1'>
                <p>Doctor password</p>
                <input value={password} onChange={(e)=>setpassword(e.target.value)} className='border rounded px-3 py-2' type='password' placeholder='password' required/>
            </div>
            <div className='flex-1 flex flex-col gap-1'>
                <p>Doctor experience</p>
                <select value={experience} onChange={(e)=>setexperience(e.target.value)} className='border rounded px-3 py-2'>
                    <option value="1 Year">1 Year</option>
                    <option value="2 Year">2 Year</option>
                    <option value="3 Year">3 Year</option>
                    <option value="4 Year">4 Year</option>
                    <option value="5 Year">5 Year</option>
                    <option value="6 Year">6 Year</option>
                    <option value="7 Year">7 Year</option>
                    <option value="7+ Year">7+</option>
                </select>
            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <p className='flex-1 flex flex-col gap-1'>Fees</p>
               <input value={fees} onChange={(e)=>setfess(e.target.value)} className='border rounded px-3 py-2' type='number' placeholder='fees of appointment' required/>
            </div>
        </div>
        <div className='w-full flex flex-col gap-4 lg:flex-1'>
           <div className='flex-1 flex flex-col gap-1'>
            <p>Speciality</p>
            <select value={speciality} onChange={(e)=>setspeciality(e.target.value)} className='border rounded px-3 py-2'>
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
            </select>
           </div>
           <div className='flex-1 flex flex-col gap-1'>
              <p>Education</p>
               <input onChange={(e)=>setdegree(e.target.value)} value={degree} className='border rounded px-3 py-2'  type='text' placeholder='Education' required/>
            </div>
                <p>Address</p>
                <input onChange={(e)=>setline1(e.target.value)} value={line1} className='border rounded px-3 py-2' type='text' placeholder='line 1' required></input>
                <input onChange={(e)=>setline2(e.target.value)} value={line2} className='border rounded px-3 py-2' type='text' placeholder='line 2' required></input>
            </div>
        </div>
    
               <div className=''>
              <p className='mt-4 mb-2'>About</p>
               <textarea onChange={(e)=>setabout(e.target.value)} value={about} className='border rounded w-full px-4 pt-2'  placeholder='Write about doctor' rows={5} required/>
            </div>
            <button className='bg-[#5F6FFF] px-10 py-3 rounded-full text-white cursor-pointer'>Add Doctor</button>
            </div>
   </form>
  )
}

export default AddDoctor

import React, { useContext, useState } from 'react'
import axios, { Axios } from 'axios'
import {assets} from '../assets/assets.js'
import { adminContext } from '../context/adminContext.jsx'
 import {  toast } from 'react-toastify';
import { doctorcontext } from '../context/doctorContext.jsx';


const Login = () => {

    const [state,setState] = useState('Admin');
    const[email,setEmail] = useState('');
    const[password,setPassword] = useState('');
     const {setatoken,backendUrl} = useContext(adminContext)
  const{setDtoken} = useContext(doctorcontext)

    const onSubmitHandler = async (event)=>{
      event.preventDefault();
      try{
        if(state === 'Admin'){
            const {data} = await axios.post(backendUrl + '/api/admin/login',{email,password})
            if(data.success){
               setatoken(data.token)
               toast.done('Succefully Login')
               localStorage.setItem('atoken',data.token)
            } else {
           toast.error(data.message)
        }
        } else{
          const {data}= await axios.post(backendUrl+'/api/doctor/login',{email,password});
          if(data.success){
            localStorage.setItem('dToken',data.token);
            setDtoken(data.token);
          } else{
            toast.error(data.message)
          }
        }
      } catch(error){
        console.log('login eror',error);
      }
    }

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
        <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E]'>
            <p className='text-2xl font-semibold m-auto '> <span className='text-[#5F6FFF]'>{state} </span> Login </p>
            <div className='w-full'>
                <p>Email</p>
                <input onChange={(e)=>setEmail(e.target.value)} value={email} className='border border-[#DADADA] w-full mt-1 p-2' type='email' required/>
            </div>
            <div className='w-full'>
                <p>Password</p>
                <input onChange={(e)=>setPassword(e.target.value)} value={password}  className='border border-[#DADADA] w-full mt-1 p-2' type='password' required/>
            </div>
            <button className='bg-[#5F6FFF] py-2  text-white w-full rounded-md text-base cursor-pointer'> Login</button>
            {
                state === 'Admin' ?
                <p> Login as a Doctor ? <span className='text-[#5F6FFF] cursor-pointer underline' onClick={()=>setState('Doctor')}>Click Here</span></p>
                :
                <p>Login as a Admin  ? <span className='text-[#5F6FFF] cursor-pointer underline' onClick={()=>setState('Admin')}>Click Here</span></p>
            }
        </div>
    </form>
  )
}

export default Login

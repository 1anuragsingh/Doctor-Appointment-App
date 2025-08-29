import React from 'react'
import {Route , Routes} from 'react-router-dom'
import Home from './pages/home'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import Doctor from './pages/Doctor'
import Myprofile from './pages/Myprofile'
import Myappointments from './pages/Myappointments'
import Appointment from './pages/Appointment'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { ToastContainer, toast } from 'react-toastify';
const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'> 
    <ToastContainer />
    <Navbar/>
    <hr className = "border-none outline-none h-[1px] bg-gray-400 m-auto mb-10 "/>

    <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/doctors' element={<Doctor/>} />
    <Route path='/doctors/:speciality' element={<Doctor/>} />
    <Route path='/login' element={<Login/>} />
    <Route path='/contact' element={<Contact/>} />
    <Route path='/about' element={<About/>} />
    <Route path='/my-profile' element={<Myprofile/>} />
    <Route path='/my-appointments' element={<Myappointments/>} />
    <Route path='/appointment/:docid' element={<Appointment/>} />
    </Routes>
    <Footer />
    </div>
  )
}

export default App

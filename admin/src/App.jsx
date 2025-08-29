import React from 'react'
import Login from './pages/login'
import { ToastContainer, toast } from 'react-toastify';
import { useContext } from 'react';
import { adminContext } from './context/adminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/admin/dashboard';
import AddDoctor from './pages/admin/addDoctor';
import AllAppointment from './pages/admin/allAppointment';
import DoctorList from './pages/admin/doctorList';
import { doctorcontext } from './context/doctorContext';
import DoctorDashboard from './pages/doctor/doctorDashboard';
import DoctorAppointments from './pages/doctor/doctorAppointments';
import DoctorProfile from './pages/doctor/doctorProfile';


const App = () => {
  const {atoken} = useContext(adminContext)
  const {dToken} = useContext(doctorcontext)

  return atoken || dToken ? (
    <div className='bg-[#F8F9FD]'>
    <ToastContainer />
    <Navbar/>
    <div className='flex items-start'> <Sidebar/>
    <Routes>
      <Route path='/' element={<></>}/>
      <Route path='/admin-dashboard' element={<Dashboard/>}/>
      <Route path='/add-doctor' element={<AddDoctor/>}/>
      <Route path='/all-appointments' element={<AllAppointment/>}/>
      <Route path='/doctors-list' element={<DoctorList/>}/>
      
      {/* doctor route */}

      <Route path='/doctor-dashboard' element={<DoctorDashboard/>}/>
      <Route path='/doctor-appointments' element={<DoctorAppointments/>}/>
      <Route path='/doctor-profile' element={<DoctorProfile/>}/>
    </Routes>
    </div>

    </div>
  ) :(
    <>
     <Login>
    </Login>
    <ToastContainer />
    </>
  )
}

export default App

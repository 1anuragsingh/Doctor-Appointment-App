import express from 'express'
import { appointmentCancel, appointmentComplete, dashboardData, doctorAppointmetns, doctorList, doctorLogin, doctorProfile, updateDoctorProfile } from '../controller/doctorController.js';
import authDoctor from '../middlware/authDoctor.js';

const doctorRouter = express.Router();

doctorRouter.get('/list',doctorList)
doctorRouter.post('/login',doctorLogin)

doctorRouter.get('/appointments',authDoctor,doctorAppointmetns)
doctorRouter.get('/dashboard',authDoctor,dashboardData)

doctorRouter.post('/cancel-appointment',authDoctor,appointmentCancel)
doctorRouter.post('/complete-appointment',authDoctor,appointmentComplete)

doctorRouter.get('/profile',authDoctor,doctorProfile)
doctorRouter.post('/update-profile',authDoctor,updateDoctorProfile)


export default doctorRouter
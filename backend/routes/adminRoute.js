import express from 'express'
import {addDoctor,adminDashboard,allDoctors,appointmentAdmin,appointmentCancel,loginAdmin} from '../controller/adminController.js'
import upload from '../middlware/multer.js'
import authAdmin from '../middlware/authAdmin.js';
import { changeAvailability } from '../controller/doctorController.js';

const adminRoute = express.Router();
adminRoute.post('/add-doctor',authAdmin,upload.single('image'),addDoctor)
adminRoute.post('/login',loginAdmin);
adminRoute.post('/all-doctors',authAdmin,allDoctors);
adminRoute.post('/change-availabilty',authAdmin,changeAvailability);
adminRoute.get('/all-appointments',authAdmin,appointmentAdmin);
adminRoute.post('/cancel-appointment',authAdmin,appointmentCancel);
adminRoute.get('/dashboard-data',authAdmin,adminDashboard);

export default adminRoute;
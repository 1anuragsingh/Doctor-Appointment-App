import express from 'express'
import { getProfile, updateProfile, userLogin, userRegister,bookAppointment, listAppointments, cancelAppointment } from '../controller/userController.js'
import authUser from '../middlware/authUser.js';
import upload from '../middlware/multer.js';

const userRouter = express.Router();

userRouter.post('/register',userRegister)
userRouter.post('/login',userLogin)
userRouter.get('/get-profile',authUser,getProfile)
userRouter.post('/update-profile',upload.single('image'),authUser,updateProfile)
userRouter.post('/book-appointment',authUser,bookAppointment)
userRouter.get('/my-appointments',authUser,listAppointments)
userRouter.post('/cancel-appointment',authUser,cancelAppointment)

export default userRouter
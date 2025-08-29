
import validator from 'validator'
import bcrypt from 'bcrypt'
import { v2 as cloudinary } from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import jwt from 'jsonwebtoken'
import appointmentModel from '../models/appointmentModel.js'
import userModel from '../models/userModel.js'

// api for addding  doctor
const addDoctor = async (req,res)=>{
    try{
        const d = Date.now();
        const date = new Date(d).toLocaleDateString();
        const {name,email,password,speciality,degree,experience,about,fees,address} = req.body;
        const imageFile = req.file;

        // checking for all data to add in doctor data
        if( !name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address){
            return res.json({success:false, message : "Missing details"});
        }
        if(!validator.isEmail(email)){
            return res.json({success:false, message : "Please write valid email"});
        }
        if(password.length < 6){
            return res.json({success:false, message : "Please use strong password"});
        }

        // hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedpass = await bcrypt.hash(password,salt);

        // upload image to cloudinary
         const imageUpload = await cloudinary.uploader.upload(imageFile.path,{
            resource_type : 'image',
         });
         const imageUrl = imageUpload.secure_url
         const doctorData = {
            name,
            email,
            password :hashedpass,
            image : imageUrl,
            speciality,
            degree,
            experience,
            about,
            fees,
            address:JSON.parse(address),
            date:date
         }
         const newDoctor = new doctorModel(doctorData);
         await newDoctor.save();
         res.json({success:true, message : "Doctor added"});
    }catch(error){
        console.log(error);
        res.json({success:false, message : error.message});
    }
}

// api for admin login
const loginAdmin = async (req,res)=>{
    try{
        const {email,password} = req.body;
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
           const token = jwt.sign(email+password,process.env.JWT_SECRET);
           res.json({success:true,token})
        }else{
            res.json({success:false,message:"invalid credential"})
        }
    } catch(error){
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

/// api to get all doctors list for admin panel
const allDoctors = async(req,res)=>{
    try{
        const doctors = await doctorModel.find({}).select('-password')
        res.json({success:true,doctors})
    } catch(error){
        console.log(error);
        res.json({success:false,message:error.message});
    }
}

// api to get all appointments list

const appointmentAdmin = async(req,res)=>{
    try {
        const appointments = await appointmentModel.find({})
        res.json({success:true,appointments})
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message});        
    }
}
// api to cancel appointment
const appointmentCancel = async(req,res)=>{
    try {
        const {appointmentId }= req.body;
        const appointmentData = await appointmentModel.findById(appointmentId);

        await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true});

        // releasing doctor slot
        const {docId,slotDate,slotTime} = appointmentData;
        const doctorData = await doctorModel.findById(docId)

        let slots_booked = doctorData.slots_booked
        slots_booked[slotDate]  = slots_booked[slotDate].filter(e => e !== slotTime)

        await doctorModel.findByIdAndUpdate(docId,{slots_booked});

        res.json({success:true,message:"Appointment cancelled"})
        
    } catch (error) {
         console.log(error)
    return res.json({ success: false, message: error.message });
    }
  }

  // api to get dashboard data for admin panel

  const adminDashboard = async(req,res)=>{
    try {
        const doctor = await doctorModel.find({});
        const users = await userModel.find({});
        const appointments = await appointmentModel.find({});
        const dashData = {
           doctors: doctor.length,
           patients : users.length,
           appointments: appointments.length,
           latestAppointmets: appointments.reverse().slice(0,5)
        }
        
          res.json({success:true,dashData})

    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message });       
    }
  }

export {addDoctor,
    loginAdmin,
    allDoctors,
    appointmentAdmin,appointmentCancel,adminDashboard};
import doctorModel from "../models/doctorModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointmentModel.js";

// api to login doctor

const doctorLogin = async(req,res)=>{
     try{
       const {email,password} = req.body;
       const doctor = await doctorModel.findOne({email});
       if(!doctor){
        return res.json({success:false,message:"invalid credential"})
       }

       const isMatch = await bcrypt.compare(password,doctor.password);
       if(isMatch){
        const token = jwt.sign({id:doctor._id},process.env.JWT_SECRET);
        res.json({success:true,token})
       } else{
        return res.json({success:false,message:"invalid credential"})
       }
    } catch(error){
         console.log(error);
        res.json({success:false, message : error.message});
    }
}


// api to change doctor availability
const changeAvailability = async(req,res)=>{
    try{
        const {docId} = req.body
        const docData = await doctorModel.findById(docId)
        await doctorModel.findByIdAndUpdate(docId,{available: !docData.available})
        res.json({success:true,message:"availabilty changed"})
    } catch(error){
         console.log(error);
        res.json({success:false, message : error.message});
    }
}

const doctorList = async(req,res)=>{
    try{
        const doctors = await doctorModel.find({}).select(['-password','-email'])
        res.json({success:true,doctors})

    }catch(error){
        console.log(error);
        res.json({success:false, message : error.message});
    }
}

// api to get doctor appointments for doctor pannel
 
const doctorAppointmetns = async(req,res)=>{
     try{
        const docId = req.docId;
        const appointments = await  appointmentModel.find({docId});
        res.json({success:true,appointments})

    }catch(error){
        console.log(error);
        res.json({success:false, message : error.message});
    }
}
// api to mark appointment completed
 const appointmentComplete = async(req,res)=>{
    try{
        const docId = req.docId;
        const {appointmentId} = req.body;
        const appointmentData = await appointmentModel.findById(appointmentId);
        
        
        if(appointmentData && appointmentData.docId === docId){
            await appointmentModel.findByIdAndUpdate(appointmentId,{isCompleted:true});
             res.json({success:true,message:'Appointment Completed'})
        }
        else{
        res.json({success:false,message:"Mark failed"})
        }

    }catch(error){
        console.log(error);
        res.json({success:false, message : error.message});
    }
 }
  // api to cancel appointmetn
 const appointmentCancel = async(req,res)=>{
    try{
        const docId = req.docId;
        const {appointmentId }= req.body;
        const appointmentData = await appointmentModel.findById(appointmentId);
        
        if(appointmentData && appointmentData.docId === docId){
            await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true});
             res.json({success:true,message:'Appointment Cancelled'})
        }
        else{
        res.json({success:false,message:"Cancellation failed"})
        }

    }catch(error){
        console.log(error);
        res.json({success:false, message : error.message});
    }
 }

 // api to get doctor dashboard data
   const dashboardData = async(req,res)=>{
     try{
        const docId = req.docId;
        const appointments = await appointmentModel.find({docId});

        let earning = 0;
        appointments.map((item)=>{
            if(item.isCompleted || item.payment) {earning += item.amount;}
     })
     let patients = [];
     appointments.map((item)=>{
        if(!patients.includes(item.userId)){
            patients.push(item.userId);
        }
     })
     
     const dashData = {
        earning,
        appointments : appointments.length,
        patients : patients.length,
        latestAppointments : appointments.reverse().slice(0,5)
     }
     res.json({success:true,dashData});

    }catch(error){
        console.log(error);
        res.json({success:false, message : error.message});
    }
   }

   // api to get doctor profile 
   const doctorProfile = async(req,res)=>{
     try{
        const docId = req.docId;
        const profileData = await doctorModel.findById(docId).select('-password');
        res.json({success:true,profileData})

    }catch(error){
        console.log(error);
        res.json({success:false, message : error.message});
    }
   }
   // api to update docdata
   const updateDoctorProfile = async(req,res)=>{
     try{
        const docId = req.docId;
        const {fees,address,available} = req.body;
        await doctorModel.findByIdAndUpdate(docId,{fees,address,available});
        res.json({success:true,message:'Profile updated'})

    }catch(error){
        console.log(error);
        res.json({success:false, message : error.message});
    }
   }
export {
    changeAvailability,
    doctorList,
    doctorLogin,
    doctorAppointmetns,
    appointmentCancel,
    appointmentComplete,
    dashboardData,
    doctorProfile,
    updateDoctorProfile
}
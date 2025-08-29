// api to register to user
import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken'
import { v2 as cloudinary } from 'cloudinary'
import doctorModel from '../models/doctorModel.js';
import appointmentModel from '../models/appointmentModel.js';
import razorpay from 'razorpay'

const userRegister = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            return res.json({ success: false, message: "Missing Details" });
        }
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Enter a valid Email" });
        }
        // validate strong pass
        if (password.length < 6) {
            return res.json({ success: false, message: "Use strong Password" });
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const userData = {
            name,
            email,
            password: hashedPassword
        }
        const newUser = new userModel(userData)
        const user = await newUser.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        return res.json({ success: true, token })
    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message });
    }
}
const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.json({ success: false, message: "Missing Details" });
        }
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Enter a valid Email" });
        }
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User doesn't exist" });
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            return res.json({ success: true, token });
        } else {
            return res.json({ success: false, message: "Enter right password" });
        }
    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message });
    }
}

// api to get user profile
const getProfile = async (req, res) => {
    try {
        const userId = req.userId
        const userData = await userModel.findById(userId).select('-password')
        res.json({ success: true, userData })
    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message });
    }
}
const updateProfile = async (req, res) => {
    try {
        const { name, phone, address, dob, gender } = req.body
        const imageFile = req.file
        const userId = req.userId
        if (!name || !phone || !address || !dob || !gender) {
            return res.json({ success: false, message: "data is  missing" });
        }
        await userModel.findByIdAndUpdate(userId, { name, phone, address: JSON.parse(address), dob, gender })
        if (imageFile) {
            // upload image to cloudinary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' })
            const imageUrl = imageUpload.secure_url;
            await userModel.findByIdAndUpdate(userId, { image: imageUrl })
        }
        res.json({ success: true, message: "profile Updated" })

    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message });
    }
}
// api to book appointment

 const bookAppointment = async (req,res) =>{
    try {
       const {docid,slotDate,slotTime} = req.body
       
       const userId = req.userId
       const docData = await doctorModel.findById(docid).select('-password');
       if(!docData.available){
        return res.json({success:false,message:'doctor not available for booking'})
       }
       let slots_booked = docData.slots_booked
       if(slots_booked[slotDate]){
          if(slots_booked[slotDate].includes(slotTime)){
         return res.json({success:false,message:'slot is not available'})
          }else{
           slots_booked[slotDate].push(slotTime)
          }
       } else{
            slots_booked[slotDate] = [];
            slots_booked[slotDate].push(slotTime);
       }
       const userData = await userModel.findById(userId).select('-password')
       delete docData.slots_booked

       const appointmentData = {
        userId,
        docId:docid,
        userData,
        docData,
        amount:docData.fees,
        slotDate,
        slotTime,
        date:Date.now()
       }
       const newAppointment = new appointmentModel(appointmentData)
        await newAppointment.save();
        // save new slot data in doctor data

        await doctorModel.findByIdAndUpdate(docid,{slots_booked})

        res.json({success:true,message:"Appointment booked"})

    } catch (error) {
         console.log(error)
        return res.json({ success: false, message: error.message });
    }
 }

 // api to get myAppointments

 const listAppointments =  async(req,res)=>{
   try {
     const userId = req.userId;
    const appointments = await appointmentModel.find({userId})
    res.json({success:true,appointments});
    
   } catch (error) {
    console.log(error)
    return res.json({ success: false, message: error.message });
    
   }
 }

 // api to cancel appointment

  const cancelAppointment = async(req,res)=>{
    try {
        const userId = req.userId;
        const {appointmentId }= req.body;
        const appointmentData = await appointmentModel.findById(appointmentId);

        // verify appointment user
        if(appointmentData.userId !== userId){
            res.json({success:false,message:"Unauthorised access"})
        }
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


export { userRegister,
     userLogin,
      getProfile,
       updateProfile,
       bookAppointment ,
       listAppointments,
       cancelAppointment
    }
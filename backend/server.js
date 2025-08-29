import express from 'express'
import cors from 'cors'
import 'Dotenv/config' 
import connectDB from './config/mongoDb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRoute from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoute.js';
 const app = express();
 const port = process.env.PORT ||  4000;

 connectCloudinary();
 connectDB();

 // middlewares
  app.use(cors());
  app.use(express.json());

  // api endpoints
  app.use('/api/admin',adminRoute);
  app.use('/api/doctor',doctorRouter);
  app.use('/api/user',userRouter);
  

  app.get('/',(req,res)=>{
    res.send("welcome to backend server");
  })
  app.listen(port,()=> console.log("server started 🚀"))
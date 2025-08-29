import axios from "axios";
import { createContext, useState } from "react"
import { toast } from "react-toastify";

export const adminContext = createContext();

const  AdminContextProvider = (props)=>{
    const[atoken,setatoken] = useState(localStorage.getItem('atoken')?localStorage.getItem('atoken'):"");
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const[doctors,setDoctors] = useState([]);
    const[appointments,setAppointments] = useState([]);
    const[dashData,setDashData] = useState(false);

    const getAllDoctors = async()=>{
        try{
            const {data} = await axios.post(backendUrl+'/api/admin/all-doctors',null,{headers:{atoken}})
            if(data.success){
                setDoctors(data.doctors)
                
            }else{
                toast.error(data.message)
            }
        } catch(error){
            console.log(error);
            toast.error(data.message)
            res.json({success:false,message:error.message})
        }
    }
    const changeAvailability = async(docId)=>{
        try{
            const{data} = await axios.post(backendUrl+'/api/admin/change-availabilty',{docId},{headers:{atoken}})
            if(data.success){
                toast.success(data.message)
                getAllDoctors();
            }
            else{
                toast.error(data.message)
            }
        }catch(error){
            toast.error(data.message)
        }
    }

    const getAllAppointments = async()=>{
        try {
            const {data} = await axios.get(backendUrl+'/api/admin/all-appointments',{headers:{atoken}});
            if(data.success){
                setAppointments(data.appointments);
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(data.message)
            res.json({success:false,message:error.message})
        }
    }
    const cancelAppointment = async(appointmentId)=>{
        try {
            const {data} = await axios.post(backendUrl+'/api/admin/cancel-appointment',{appointmentId},{headers:{atoken}})
            if(data.success){
                toast.success(data.message);
                getAllAppointments();
            }else{
                toast.error(data.message)
            }
            
        } catch (error) {
            console.log(error);
            toast.error(data.message)
            res.json({success:false,message:error.message})          
        }
    }

    const getDashData = async()=>{
        try {
            const {data} = await axios.get(backendUrl+'/api/admin/dashboard-data',{headers:{atoken}})

            if(data.success){
                setDashData(data.dashData);
                
            } else{
                toast.error(data.message);
            }
            
        } catch (error) {
            console.log(error);
            toast.error(data.message)
            res.json({success:false,message:error.message})                     
        }
    }
    

    const value = {
        atoken,
        setatoken,
        backendUrl,
        doctors,
        getAllDoctors,
        changeAvailability
        ,setAppointments,
        appointments,
        getAllAppointments,
        cancelAppointment,
        dashData,
        getDashData
    }
    return(
        <adminContext.Provider value={value}>
            {props.children}
        </adminContext.Provider>
    )
}
export default AdminContextProvider;
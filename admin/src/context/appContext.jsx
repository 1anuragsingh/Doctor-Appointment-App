import { createContext } from "react"

export const Appcontext = createContext();


const  AppContextProvider = (props)=>{
    const months = ['','JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','AUG','NOV','DEC'];
    const currency = '$'

   const dateFormat = (sd)=>{
    const dateArray = sd.split('_');
    return dateArray[0] +" " + months[Number(dateArray[1])]+" "+dateArray[2];
  }


    const calculateAge = (dob)=>{
        const today = new Date();
        const birthDate = new Date(dob);
        let age =  today.getFullYear()-birthDate.getFullYear();
        return age;
    }
    const value = {
        calculateAge,
        dateFormat,
        currency
    }
    return(
        <Appcontext.Provider value={value}>
            {props.children}
        </Appcontext.Provider>
    )
}
export default AppContextProvider;
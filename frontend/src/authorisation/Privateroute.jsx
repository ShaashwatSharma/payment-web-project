import { useNavigate } from "react-router-dom";
import React from "react";
const Privateroute=({Children})=>{
    const Navigate=useNavigate();
    const token=localStorage.getItem("token");
    
    {(token!=null)?Children:<Navigate to={"/signin"}/>}

}
export default Privateroute;
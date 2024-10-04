import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import { Appbar } from "../components/Appbar"
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const Dashboard=()=>{
    const navigate=useNavigate();
    const token=localStorage.getItem('token');
    if(!token){
    useEffect(()=>{
        navigate("/signin");
    },[])
    }
    else {
    console.log("Control reached point four");

    return <div>
        <Appbar/>
        <div className="m-8">
            <Balance value={"10000"}/>
            <Users/>
        </div>
    </div>}
}
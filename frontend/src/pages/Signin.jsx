import { useState } from "react"
import { Heading } from "../components/heading"
import { Inputs } from "../components/inputs"
import { Subheading } from "../components/subheading"
import { Button } from "../components/Button"
import { Bottomwarning } from "../components/Bottomwarning"
import { useNavigate } from "react-router-dom"
// import { JWT_SECRET } from "../../../backend/config"


export const Signin=()=>{

    
    const[username,setusername]=useState("");
    const[password,setpassword]=useState("");
const navigate=useNavigate();

    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className=" flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign-In"}/>
                <Subheading label={"Enter your Username & Password"}/>
                <Inputs onChange={(e)=>{
                    setusername(e.target.value)
                }} label={"Username/Mail"} placeholder="Username/Mail here"/>
                <Inputs onChange={(e)=>{
                    setpassword(e.target.value)
                }}label={"Password"} placeholder="Password here" />
                    <div className="pt-4">
                        <Button onClick={async (e)=>{
                            const token=localStorage.getItem("token");
                            // const {success}=await jwt.verify(token,JWT_SECRET);
                            // if(!success){
                            //     navigate("/signup")
                            //     alert("You are signed out please sign in ")
                            // }
    // Write this code here 

                        navigate("/dashboard");
                        }} label={"Sign-In"}/>
                    </div>
                <Bottomwarning label={"Dont have an account ?"} buttontext={"Sign-Up"} to={"/signup"}/>
            </div>
        </div>
    </div>
}
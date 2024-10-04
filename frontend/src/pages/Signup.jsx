import { useState } from "react";
import { Heading } from "../components/heading";
import { Inputs } from "../components/inputs";
import { Subheading } from "../components/subheading";
import { Button } from "../components/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Bottomwarning } from "../components/Bottomwarning";

export const Signup=()=> {
    const navigate = useNavigate();
    const [username, setusername] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [password, setpassword] = useState("");

    return <div className="flex justify-center bg-slate-300 h-screen">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign-Up"} />
                <Subheading label={"Enter your information to create an acount"} />
                <Inputs onChange={(e) => {
                    setusername(e.target.value)
                }} placeholder={"Username here "} label={"Username"} />
                <Inputs onChange={(e) => {
                    setpassword(e.target.value)
                }} placeholder={"Password here "} label={"Password Name"} />
                <Inputs onChange={(e) => {
                    setFirstname(e.target.value)
                }} placeholder={"First name here "} label={"First Name"} />
                <Inputs onChange={(e) => {
                    setLastname(e.target.value)
                }} placeholder={"Last name here "} label={"Last Name"} />
                <div className="pt-4">
                    <Button onClick={async(e) => {
                        const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                            username,
                            password,
                            firstname,
                            lastname
                        });
                        localStorage.setItem("token", response.data.token)
                        navigate("/dashboard");
                    }} label={"Sign-up"} />
                </div>
                <Bottomwarning label={"Already have an account"} buttontext={"Sign-in"} to={"/signin"} />
            </div>
        </div>
    </div>
}
import React, { useState } from "react";
import RegisterStyles from "./styles/RegisterStyles.css";
import ParticleBackground from "../components/ParticleBackground";
import { Link } from "react-router-dom";
import axios from "axios";
import { useOnPressEnter } from "../hooks/useOnPressEnter";


export default function Register() {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [verifyPassword, setVerifyPassword] = useState("")


    const checkUsernameExists = () => {

    }

    const checkEmailExists = () => {

    }
    const handleRegister = async () => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, {username, email, password, verifyPassword}, {withCredentials:true})
            localStorage.setItem("user_id", res.data.id)
            window.location.href = "/"
        } catch {

        }
    }

    useOnPressEnter(handleRegister, "Enter")
    
    return(
        <div>
            <ParticleBackground/>
            <div className="container" >
            <div className="register-container">
                <h1>Sign Up</h1>
                <label for="username" id="username">Username</label>
                <input placeholder ="Type your username" required onChange={(e)=> setUsername(e.target.value)}  />
                <label for="email" id="email">Email</label>
                <input placeholder ="Type your email" type="email" required onChange={(e)=> setEmail(e.target.value)} />
                <label for="password" id="password">Password</label>
                <input placeholder ="Type your password" type="password" required  onChange={(e)=> setPassword(e.target.value)} />
                <label for="confirm-password" id="confirm-password">Confirm Password</label>
                <input placeholder ="Type your password again" type="password" required onChange={(e)=> setVerifyPassword(e.target.value)}  />
                <p id="warning">*Something went wrong!</p>
                <div className="button-container">
                    <button onClick={handleRegister} >Sign Up</button>
                    <p>or</p>
                    <Link to="/login"> <p id="login" >Login</p> </Link>
                </div>
            </div>
        </div>
        </div>
        
    )
}
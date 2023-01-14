import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginStyles from "./styles/LoginStyles.css";
import ParticleBackground from "../components/ParticleBackground";
import axios from "axios";
import { useOnPressEnter } from "../hooks/useOnPressEnter";

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async () => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {email, password}, {withCredentials:true} )
            localStorage.setItem("user_id", res.data.id)
            window.location.href = "/"
        } catch {

        }
    }

    useOnPressEnter(handleLogin, "Enter")

    return(
        <div>
            <ParticleBackground/>
            <div className="container" >
            <div className="login-container">
                <h1>Login</h1>
                <label for="email" id="email">Email</label>
                <input placeholder ="Type your email" type="email" required onChange={(e)=> setEmail(e.target.value)}  />
                <label for="password" id="password">Password</label>
                <input placeholder ="Type your password" type="password" required onChange={(e)=> setPassword(e.target.value)}  />
                <p id="warning" >Something went wrong!</p>
                <div className="button-container">
                    <button onClick={handleLogin} >LOGIN</button>
                    <p>or</p>
                    <Link to="/register"> <p id="sign-up" >Sign Up</p> </Link>
                </div>
            </div>
        </div>
        </div>
        
    )
}
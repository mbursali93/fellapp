import { Link } from "react-router-dom"

import ParticleBackground from "../components/ParticleBackground"


import "./styles/homeStyles.css"

export default function Home() {

    return(
        <div className="landing-container" >
            <ParticleBackground/>
            <div className="landing">
                <h1> FELLaPP</h1>
                <p className="description" > Find new fellas and new subjects to talk. Or talk with fellas you already have and subjects you already spoke. Your choice!!</p>
                <p>Click SIGN UP to join your fellas or click to LOGIN if you already have an account</p>
                <div className="buttons">
                    <Link to="/register"> <button> SIGN IN </button> </Link>
                    <Link to="/login"> <button> LOGIN </button> </Link>


                </div>
            </div>
            
        </div>
    )
}
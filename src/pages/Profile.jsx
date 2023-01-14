import React, { useEffect, useState, useContext } from "react";
import Navbar from "../components/Navbar"
import profileStyles from "./styles/profileStyles.css"
import Photobar from "../components/Photobar";
import Button from "../components/Button";
import { Link, useLocation } from "react-router-dom";
import axios from "axios"
import { GlobalState } from "../api/GlobalState";


export default function Profile() {
    
    const state = useContext(GlobalState)
    const [loggedUser, setLoggedUser] = state.userAPI.loggedUser
    const [loggedUserPhotos, setLoggedUserPhotos] = state.userAPI.loggedUserPhotos
    const [token, setToken] = state.token
    const socket = state.userAPI.socket

    const location = useLocation();
    const id = location.pathname.split("/")[2]
    const [user, setUser] = useState(loggedUser)
    const [userPhotos, setUserPhotos] = useState([{}])

    const user_id = localStorage.getItem("user_id")
    
     

    useEffect(()=> {
        const getUser = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/users/${id}`)
        
                setUser(res.data)
                

            } catch(e) {
        
            }
        }
        if(id!== undefined)  getUser()

    },[id])

    useEffect(()=> {
        const getPhotos = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/users/photos/${id}`)
        
                setUserPhotos(res.data)
                

            } catch(e) {
        
            }
        }
        if(id!== undefined)  getPhotos()

    },[id])

    const handleLogout = async () => {
        try {
           await axios.get(`${process.env.REACT_APP_API_URL}/auth/logout`)
           localStorage.removeItem("user_id")
           window.location.href="/"

        } catch {

        }
    }

    
    
    
    return(
        <div>
            <Navbar/>
            <div className="profile-container">
                
                <div className="profile-picture">
                    <div className="circle"> <img src={id === undefined ? loggedUser.profile_picture : user.profile_picture}/></div>
                </div>
                    
                <div className="user-info">
                    <h1> {id === undefined ? loggedUser.username : user.username} </h1>
                    <p> {id === undefined ? loggedUser.description : user.description} </p>
                </div>
                <div className="button-container">
                
                    { id === undefined || id === user_id ? <Link to="/edit"> <button> Edit Profile </button> </Link>  : <Button user={user} /> }  
                     
                 
                    
                </div>
                <div className="user-photos">
                <Photobar userPhotos={id === undefined ? loggedUserPhotos : userPhotos } />
                </div>
                <div className="logout-button">
                    {id === undefined || id === user_id ? <button onClick={handleLogout}> LOGOUT </button> : <div></div> } 
                </div>
            </div>
        </div>
    )
}
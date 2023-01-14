import axios from "axios"
import { useEffect, useState, useContext } from "react"

import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';

import "./styles/requestStyles.css"
import { GlobalState } from "../api/GlobalState";

export default function Request({user}) {

    const state = useContext(GlobalState)
    const [token, setToken] = state.token
    
    const [requests, setRequests] = state.userAPI.requests
    
    const [fella, setFella] = useState({})
    const user_id = localStorage.getItem("user_id")

    useEffect(()=> {
        const getFriend = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/users/${user.sender_id}`)
                setFella(res.data)
            } catch {

            }
        }
        getFriend()
    }, [])

   const acceptRequest = async () => {
    try {
        await axios.put(`${process.env.REACT_APP_API_URL}/friends/accept/${user_id}`, {sender_id: user.sender_id}, {headers:{Authorization:token}})
        const index = requests.findIndex(r=> r.sender_id === user.id)
        requests.splice(index, 1)
        setRequests([...requests])
    }catch {

    }
   }

   const declineRequest = async () => {
    try {
        await axios.put(`${process.env.REACT_APP_API_URL}/friends/reject/${user_id}`, {sender_id: user.sender_id}, {headers:{Authorization:token}})
        const index = requests.findIndex(r=> r.sender_id === user.id)
        requests.splice(index, 1)
        setRequests([...requests])
    } catch {

    }
   }

    return (
        <div className="request">
            <div className="avatar">
              <img src={fella.profile_picture}/>  
            </div>
            <div className="user-credentials">
                <h3> {fella.username} </h3>
                <p> {fella.description} </p>
            </div>
            
            <div className="buttons">
                <button className="accept" onClick={acceptRequest}  > <DoneIcon/> </button>
                <button className="decline" onClick={declineRequest}  > <ClearIcon/>  </button>
            </div>
        </div>
    )
}
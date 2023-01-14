import { useEffect, useContext, useState } from "react";
import { GlobalState } from "../api/GlobalState";
import axios from "axios";
import { Link } from "react-router-dom";



export default function Button({user}) {
    
    const user_id = localStorage.getItem("user_id")
    const state = useContext(GlobalState)

    const [requests, setRequests] = state.userAPI.requests
    const [friends, setFriends] = state.userAPI.friends
    const [token, setToken] = state.token
    const socket = state.userAPI.socket


    const [friendshipStatus, setFriendshipStatus] = useState("")
    

   

useEffect(()=> {

    const checkStatus = () => {
        const testPending = requests.filter(r=> r.sender_id === user.id || r.receiver_id === user.id)
        const testAccept =  friends.filter(r=> r.sender_id === user.id || r.receiver_id === user.id)


        if(testPending.length > 0) {
            setFriendshipStatus("pending")
        }

        if(testAccept.length > 0) {
           setFriendshipStatus("accept")
       }

    }

  checkStatus()
    
},[requests]) 



const sendRequest = async () => {
    try {
     if(user.id === user_id || user.id === undefined) return;

     const request = {
         sender_id: user_id,
         receiver_id: user.id,
     }

    socket.emit("send_request", {request} )
    await axios.post(`${process.env.REACT_APP_API_URL}/friends/${user_id}`, {receiver_id: user.id}, {headers: {Authorization: token}})
    setFriendshipStatus("pending")
    } catch {

    }

 }

 
    

    return(
        <div> 
            { friendshipStatus === "accept" ? 
            <div>
                 <button> <Link to="/messages" style={{color:"white", textDecoration:"none"}} > Send Message </Link> </button>
                 <button> Remove Fella</button>

             </div> : 
             friendshipStatus === "pending" ?
             <div> <button> Requested </button> </div> : <button onClick={sendRequest} > Become Fella </button> } 
            
        </div>
    )
}
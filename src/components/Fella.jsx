import "./styles/fellaStyles.css"
import axios from "axios"
import { useEffect, useState, useContext } from "react"
import { GlobalState } from "../api/GlobalState"

export default function Fella({friend}) {

    const state = useContext(GlobalState)
    const [friends, setFriends] = state.userAPI.friends

    const user_id = localStorage.getItem("user_id")
    const bothIds = [friend.sender_id, friend.receiver_id]
    const friend_id = bothIds.find((id)=> id !== user_id)

    const [fella, setFella] = useState({})

    useEffect(()=> {
        const getFriend = async () => {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/users/${friend_id}`)
            setFella(res.data)
        }
        getFriend()
          
    },[])

    

    return(
        <div className="fella-container" >
            <img src={fella.profile_picture}/>
            <h4> {fella.username} </h4>

        </div>
    )
}
import "./styles/messageStyles.css"
import { useContext } from "react"
import { GlobalState } from "../api/GlobalState"
import { format } from "timeago.js"
import { Link } from "react-router-dom"



export default function Message({message, friendAvatar, friendId}) {
    const user_id = localStorage.getItem("user_id")
    const state = useContext(GlobalState)
    const [loggedUser, setLoggedUser] = state.userAPI.loggedUser
    
    
    const formattedMessage = JSON.parse(message)
    const own = user_id === formattedMessage.sender_id
    
    return(
        <div className={own ? "message-container own" : "message-container"} >
            <Link to={own ? `/profile/${user_id}`: `/profile/${friendId}` }> <img src= {own ? loggedUser.profile_picture : friendAvatar} /> </Link>
            <div className="message-infos">
                <p className={own ? "message own" : "message"}> {formattedMessage.text} </p>
                <p className={own ? "time-ago own" : "time-ago"}> {format(formattedMessage.time)} </p>
            </div>
            

        </div>
    )
}


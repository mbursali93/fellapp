import { Link } from "react-router-dom"
import { useContext, useEffect, useState, useRef } from "react"

import Navbar from "../components/Navbar"
import Fella from "../components/Fella"
import Message from "../components/Message"

import "./styles/privateChatStyles.css"

import { GlobalState } from "../api/GlobalState"
import { useOnPressEnter } from "../hooks/useOnPressEnter"

import axios from "axios"
import SendIcon from '@mui/icons-material/Send';





export default function PrivateChat() {

    const user_id = localStorage.getItem("user_id")
    const state = useContext(GlobalState)
    const socket = state.userAPI.socket
    const [token] = state.token

    const [friends, setFriends] = state.userAPI.friends
    const [messages, setMessages] = useState([])
    const [arrivalMessage, setArrivalMessage] = useState(null)
    const [friendshipInfo, setFriendshipInfo] = useState({})
    const [conversationId, setConversationId] = useState("")
    const [friendId, setFriendId] = useState("")
    const [text, setText] = useState("")
    const [friend, setFriend] = useState({})
    const [search, setSearch] = useState("")

    const scroolRef = useRef()
   
    
const getFriendInfos = (friendInfo) => {
    setConversationId(friendInfo.id)
    const bothIds = [friendInfo.sender_id, friendInfo.receiver_id]
     setFriendId(bothIds.find((id)=> id !== user_id))
     
     
}

    useEffect(()=> {
        const fetchFriendInfo = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/users/${friendId}`)
                setFriend(res.data)
            }catch {
    
            }
         }
         fetchFriendInfo()
    }, [friendId])

    

    useEffect(() => {

        const parsedArrivalMessage = JSON.parse(arrivalMessage)

        if(arrivalMessage && parsedArrivalMessage?.sender_id === friendId) {
            setMessages((prev) => [...prev, arrivalMessage]);

            
        }
        
          
      }, [arrivalMessage]);

    useEffect(()=> {
        const getMessages = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/messages/${conversationId}`)
                setMessages(res.data)
                
                
            } catch {

            }
        }
        getMessages()
    },[conversationId])



    useEffect(()=> {
        socket.on("get_message", (data)=> {
            setArrivalMessage(data)
        })
       
        
    },[socket])





   const sendMessage = () => {

    if(text === "" || friendId === "") return;
    
    const message = {
        sender_id: user_id,
        receiver_id: friendId,
        text,
        conversationId,
        time: Date.now(),
    }
     setMessages((prev)=> [...prev, JSON.stringify(message)])
    socket.emit("send_message", {message})
    
   }

   useOnPressEnter(sendMessage, "Enter")
    
    useEffect(()=> {
        scroolRef.current?.scrollIntoView({behavior: "smooth" })
        setText("")
    },[messages])


    


    return(
        <div>
            <Navbar/>
            <div className="private-chat">
                <div className="friendlist">
                    <p> Friendlist</p>
                    {friends.map(friend=> (
                       <div onClick={()=> getFriendInfos(friend)}> <Fella friend={friend} />  </div>  
                    ))}
                </div>
                <div className="chat-container">
                    
                    <div className="messages-container">
                        <div className="friend-username"> <h2> {friend.username} </h2> </div>
                        
                            
                            <div className="chat-messages">
                                {messages.length > 0 || <div className="start-conversation"><h1>Start a conversation</h1> </div> }
                                
                        <div className="text-messages">
                        {
                        messages.map(message=> (
                            <div ref={scroolRef} >  <Message message={message} friendAvatar={friend.profile_picture} friendId = {friend.id} /> </div>
                        ))}
                        </div>
                        
                        </div>
                            
                        

                    </div>
                    <div className="text-area">
                    <input placeholder="Be polite.." value={text} onChange={(e)=> setText(e.target.value)}/>
                    <div className="send-button"> <button onClick={sendMessage} > <SendIcon/> </button> </div>
                    </div> 
                    
                </div>
                
                
                
            </div>
        </div>
    )
}
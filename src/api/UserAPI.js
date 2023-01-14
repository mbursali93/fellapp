import { useEffect, useState } from "react"
import axios from "axios"
import { io } from "socket.io-client"

const socket = io.connect(process.env.REACT_APP_SOCKET_URL)

export default function UserAPI(token) {
    const [loggedUser, setLoggedUser] = useState({})
    const [loggedUserPhotos, setLoggedUserPhotos] = useState([{}])
    const [friends, setFriends] = useState([])
    const [requests, setRequests] = useState([])
    const [arrivalRequest, setArrivalRequest] = useState(null)

    

    

    const user_id = localStorage.getItem("user_id")

    useEffect(()=> {
        if(token) {
            const getProfile = async () => {
                try {
                    const res = await axios.get(`${process.env.REACT_APP_API_URL}/users/${user_id}`)
            
                    setLoggedUser(res.data)
                    
    
                } catch(e) {
            
                }
            }
              getProfile()
        }
     },[token])

     useEffect(()=> {
        const getPhotos = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/users/photos/${user_id}`)
                setLoggedUserPhotos(res.data)
            } catch {

            }
        }
        getPhotos()
     },[token])

     useEffect(()=> {
        if(token) {
            const getFriends = async () => {
                try {
                    const res = await axios.get(`${process.env.REACT_APP_API_URL}/friends/${user_id}`)
                    setFriends([...res.data])
                }catch {
    
                }
            }
            getFriends()
        }
        
     },[token, requests])

     useEffect(()=> {
        if(token) {
            const getFriendsRequests = async () => {
                try {
                    const res = await axios.get(`${process.env.REACT_APP_API_URL}/friends/requests/${user_id}`)
                setRequests([...res.data])
                

                } catch {
                    
                }
            }
            getFriendsRequests()
           
        }
     }, [token, socket])

     useEffect(()=> {
        socket.emit("add_user", user_id)
        socket.on("get_user", (users)=> {
            
        })
    }, [user_id])

    useEffect(()=> {

        socket.on("get_request", ({request})=> {
           setArrivalRequest(request)
           
        })
        
        
    },[socket])

    useEffect(() => {
        const result = requests.filter(r=> r.sender_id === arrivalRequest.sender_id)
        

        if(result.length === 0) {
            arrivalRequest &&
            setRequests((prev) => [...prev, arrivalRequest]);
        }
        
      }, [arrivalRequest]);
     
      
    return{
        
        loggedUser: [loggedUser, setLoggedUser],
        loggedUserPhotos: [loggedUserPhotos, setLoggedUserPhotos],
        friends : [friends, setFriends],
        requests: [requests, setRequests],
        socket,
    }
}
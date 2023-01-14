import Navbar from "../components/Navbar"
import Request from "../components/Request"

import { useContext } from "react"
import { GlobalState } from "../api/GlobalState"

import "./styles/requestStyles.css"

export default function Requests() {
    const state = useContext(GlobalState)
    const [requests, setRequests] = state.userAPI.requests

    
    return(
        <div>
            <Navbar/>
            <div className="request-container">
            { 
            requests.map(user=> (
                <Request user = { user } />
            ))
            }
            </div>
        </div>
    )
}
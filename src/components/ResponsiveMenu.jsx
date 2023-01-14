import PersonIcon from '@mui/icons-material/Person';
import PeopleIcon from '@mui/icons-material/People';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import Badge from '@mui/material/Badge';


import { NavLink } from 'react-router-dom';


import "./styles/responsiveMenuStyles.css"
import { useContext } from 'react';
import { GlobalState } from '../api/GlobalState';

export default function ResponsiveMenu() {
    const state = useContext(GlobalState)
    const [requests, setRequests] = state.userAPI.requests

    return(
        <div className="responsive-menu" >
            <div className="request-icon"> <NavLink to="/request" style={({isActive})=>
                isActive ? {backgroundColor: "#d5bff2", color:"#4f3770"} : {backgroundColor: "none"}
        } >  <Badge badgeContent={requests.length} color="primary" max={31}  >
                        
                         <PeopleIcon/> 
                      </Badge> </NavLink> </div>

            <div className="profile-icon"> <NavLink to="/profile"  style={({isActive})=>
                isActive ? {backgroundColor: "#d5bff2", color:"#4f3770"} : {backgroundColor: "none"}
        }>  <Badge badgeContent={0} color="primary" max={31}  >
                        
                         <PersonIcon/> 
                      </Badge> </NavLink> </div>

            <div className="messages-icon"> <NavLink to="/messages"  style={({isActive})=>
                isActive ? {backgroundColor: "#d5bff2", color:"#4f3770"} : {backgroundColor: "none"}
        }>  <Badge badgeContent={0} color="primary" max={31}  >
                        
        <ChatBubbleIcon/> 
     </Badge> </NavLink> </div>
        </div>
    )
}
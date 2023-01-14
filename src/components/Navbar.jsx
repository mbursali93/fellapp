import React, {useContext, useState} from "react";
import { Link, NavLink, useNavigate } from "react-router-dom"
import navbarStyles from "./styles/navbarStyles.css"
import SearchIcon from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
import { useOnPressEnter } from "../hooks/useOnPressEnter";
import ResponsiveMenu from "./ResponsiveMenu";
import { GlobalState } from "../api/GlobalState";

export default function Navbar() {

    const navigate = useNavigate()
    const [search, setSearch] = useState("")

    const state = useContext(GlobalState)
    const [requests, setRequests] = state.userAPI.requests
    const [numOfRequests, setNumOfRequests] = useState(0)


        const handleSearch = () => {
            if(search === "") return;
            navigate(`/search?username=${search}&page=1`)
        }

        
        //TO MAKE SEARCH WITH JUST ENTER KEY
        useOnPressEnter(handleSearch, "Enter")

    return(
        <nav className="nav-bar" >
            <Link to="/" style={{textDecoration:"none"}} > <div className="logo"> <h1>FellaPP</h1> </div> </Link>
            <div className="search-bar">
                <input placeholder="search.." onChange={(e)=> setSearch(e.target.value)}  />
                 <SearchIcon style={{color:"black"}} onClick={handleSearch} /> 
            </div>
            <div className="user-container">
                <ul>

                    <NavLink to="/request"
                    style={({isActive})=> {
                        return isActive ? {textDecoration:"underline"} : {textDecoration:"none"}
                    }  }>
                        <Badge badgeContent={requests.length} color="primary" max={31}  >
                        
                        <li>Requests </li>
                      </Badge> 
                    </NavLink>

                    <NavLink to="/profile"
                     style={({isActive}) => {
                        return isActive ? {textDecoration:"underline"} : {textDecoration:"none"}
                    }}>
                         <Badge badgeContent={0} color="primary" max={31}  >
                        
                        <li>Profile </li>
                      </Badge> 
                    </NavLink>

                    <NavLink to="/messages"
                     style={({isActive}) => {
                        return isActive ? {textDecoration:"underline"} : {textDecoration:"none"}
                    }} > 
                    <Badge badgeContent={0} color="primary" max={31}  >
                        
                    <li>Messages </li>
                  </Badge> 
                  </NavLink>
                </ul>
            </div>
            <ResponsiveMenu/>
        </nav>
    )
}
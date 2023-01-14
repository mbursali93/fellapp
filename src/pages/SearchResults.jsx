import { useState, useEffect } from "react"
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar"
import "./styles/searchResultsStyles.css"
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import axios from "axios"


export default function SearchResults() {

    const [searchResults, setSearchResults] = useState([])
    const [page, setPage] = useState("1")
    const [totalPage, setTotalPage] = useState()
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()

   const searchQuery = searchParams.get("username") 

    const handlePage = (event, page) => {
        setPage(page)
        navigate(`/search?username=${searchQuery}&page=${page}`)
    }
   
    useEffect(()=> {
        const getUsers = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/users?search=${searchQuery}&page=${page}`)
                setSearchResults(res.data.response)
                setTotalPage(res.data.totalPageCeil)
            } catch(e) {

            }
        }
        getUsers()
    },[searchQuery, page])



    return(
        <div>
            <Navbar/>
            
            <div className="search-container">
                {searchResults.map(user=>(
                    <div className="results">
                        <div className="result">
                            <img src={user.profile_picture}/>
                            <div className="user-credentials">
                                <h3> {user.username} </h3>
                                <p> {user.description} </p>
                            </div>
                            <a href={`/profile/${user.id}`}> <button> Visit profile </button>  </a>
                        </div>
                </div>
                ))}
            </div>
            <div className="pagination-container">
                <Stack spacing={2}>
                    <Pagination  onChange={handlePage} count={totalPage} showFirstButton showLastButton color={"primary"}/>
                </Stack>
            </div>
            
        </div>
    )
}
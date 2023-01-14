import { useState, useEffect, createContext} from "react"
import axios from "axios"
import userAPI from "./UserAPI"

export const GlobalState = createContext()

export function DataProvider({children}) {

    const [token, setToken] = useState("")

    const user_id = localStorage.getItem("user_id")

    useEffect(()=> {
        if(user_id) {
            const refreshToken = async () => {
                try {
                    const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/refresh_token`, {withCredentials:true})
                    setToken(res.data)
    
                    setTimeout(()=> {refreshToken()}, 1000 * 60 * 10)
                } catch {
    
                }
            }
            refreshToken()
        }
    }, [])

    const state = {
        token: [token, setToken],
        userAPI: userAPI(token)
    }
    return(
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}
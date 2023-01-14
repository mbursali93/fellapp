import { useEffect } from "react"

export const useOnPressEnter = (callback, targetKey) => {
   
    useEffect(()=> {
        const pressEnterHandler = (event) => {
            if(event.key === targetKey) {
                callback();
            }
        }
        window.addEventListener("keydown", pressEnterHandler)
        return () => {
            window.removeEventListener("keydown", pressEnterHandler)
        }
    }, [callback, targetKey])
}
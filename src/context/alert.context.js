import { createContext, useState } from "react"

export const AlertContext = createContext()

export const AlertProvider = ({children})=>{
    const [isAlertOpen,setIsAlertOpen] = useState(false)
    const [alertMessage,setAlertMessage] = useState("")
    const [alertColor,setAlertColor] = useState("success")
    return(
        <AlertContext.Provider value={[isAlertOpen,setIsAlertOpen,alertMessage,setAlertMessage,alertColor,setAlertColor]}>
            {children}
        </AlertContext.Provider>
    )
}


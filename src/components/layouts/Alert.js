import { Alert, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Slide, TextField } from "@mui/material";


const { AlertContext } = require("@/context/alert.context");
const { useContext, useEffect } = require("react");

const MyAlert = () => {
    const [isAlertOpen,setIsAlertOpen,alertMessage,setAlertMessage,alertColor,setAlertColor] = useContext(AlertContext)

    const handleAlertOpen = () => {
        setTimeout(() => {
            setIsAlertOpen(false);
        }, 2000);
    };
    useEffect(()=>{
        console.log(isAlertOpen)
        handleAlertOpen()
    },[isAlertOpen===true])
    return (
        <>
        <div className="absolute top-10 left-1/2 -translate-x-1/2">
            <Slide in={isAlertOpen} mountOnEnter unmountOnExit>
                <Alert severity={alertColor}>{alertMessage}</Alert>
            </Slide>
        </div>
        </>
    );
};

export default MyAlert
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Alert, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Slide, TextField } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import UsersApi from "../../api/users.api"
import CookieUtils from "../../../utils/cookie.utils";

const Users = new UsersApi
const cookie = new CookieUtils

const LoginForm = React.forwardRef(function ({ switchForm }, ref) {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [loginForm, setLoginForm] = useState({
        email: "",
        password: "",
    });

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleAlertError = () => {
        setError(true);
        setTimeout(() => {
            setError(false);
        }, 3000);
    };
    const handleSubmit = async () => {
        try {
            const response = await Users.login(loginForm)
            if(response){
                cookie.setCookie("user-access",{
                    name : response.data.name,
                    id : response.data._id,
                    token : response.token
                },{expires:1})
                window.location.href = "/"
            }
        } catch (error) {
            handleAlertError(); 
            setAlertMessage("Cannot find user")           
        }
    };

    return (
        <div ref={ref} className="p-0 m-0">
            {/* alert */}
            <div className="absolute top-10 left-1/2 -translate-x-1/2">
                <Slide in={error} mountOnEnter unmountOnExit>
                    <Alert severity="error">{alertMessage}</Alert>
                </Slide>
            </div>
            {/* email */}
            <TextField id="outlined-basic" label="Email" variant="outlined" value={loginForm.email} onChange={(event) => setLoginForm({ ...loginForm, email: event.target.value })} error={error} className="w-full" />
            {/* password */}
            <FormControl variant="outlined" className="w-full mt-4">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                    label="Password"
                    value={loginForm.password}
                    onChange={(event) => setLoginForm({ ...loginForm, password: event.target.value })}
                    error={error}
                />
            </FormControl>
            <div className="flex flex-row-reverse">
                <p className="text-slate-500 hover:text-blue-600 cursor-pointer w-max h-max underline" onClick={switchForm}>
                    Register Here
                </p>
            </div>
            <Button variant="outlined" onClick={handleSubmit} className="w-full mt-6">
                Submit
            </Button>
        </div>
    );
});

export default LoginForm;

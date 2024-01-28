import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Slide, TextField } from "@mui/material";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import UsersApi from "../../api/users.api";
import CookieUtils from "../../../utils/cookie.utils";
import { AlertContext } from "@/context/alert.context";

const Users = new UsersApi();
const cookie = new CookieUtils();

const LoginForm = React.forwardRef(function ({ switchForm }, ref) {
    const [isAlertOpen, setIsAlertOpen, alertMessage, setAlertMessage, alertColor, setAlertColor] = useContext(AlertContext);
    const [showPassword, setShowPassword] = useState(false);
    const [loginForm, setLoginForm] = useState({
        email: "",
        password: "",
    });

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit = async () => {
        try {
            const response = await Users.login(loginForm);
            if (response) {
                cookie.setCookie(
                    "user-access",
                    {
                        name: response.data.name,
                        id: response.data._id,
                        token: response.token,
                    },
                    { expires: 1 }
                );
                window.location.href = "/";
            }
        } catch (error) {
            setIsAlertOpen(true);
            setAlertMessage("Cannot find user");
            setAlertColor("error");
        }
    };

    return (
        <div ref={ref} className="p-0 m-0">
            {/* email */}
            <TextField id="outlined-basic" label="Email" variant="outlined" value={loginForm.email} onChange={(event) => setLoginForm({ ...loginForm, email: event.target.value })} error={isAlertOpen} className="w-full" />
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
                    error={isAlertOpen}
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

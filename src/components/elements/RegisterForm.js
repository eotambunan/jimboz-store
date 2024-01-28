import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Alert, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Slide, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import UsersApi from "../../api/users.api";
import { AlertContext } from "@/context/alert.context";

const Users = new UsersApi();
const RegisterForm = React.forwardRef(function ({ switchForm }, ref) {
    const [isAlertOpen, setIsAlertOpen, alertMessage, setAlertMessage, alertColor, setAlertColor] = useContext(AlertContext);
    const [showPassword, setShowPassword] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [regisForm, setRegisForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit = async () => {
        if (!regisForm.name || !regisForm.email || !regisForm.password || !regisForm.confirmPassword) {
            setIsAlertOpen(true);
            setAlertMessage("Cannot blank");
            setAlertColor("error");
        } else if (regisForm.password != regisForm.confirmPassword) {
            setIsAlertOpen(true);
            setAlertMessage("Password doesn't match");
            setAlertColor("error");
        } else {
            try {
                const response = await Users.registration(regisForm);
                setIsAlertOpen(true);
                setAlertMessage("Successfully registered. Please log in.");
                setAlertColor("success");
                switchForm();
            } catch (error) {
                setIsAlertOpen(true);
                setAlertMessage("Email has already been registered");
                setAlertColor("error");
            }
            setRegisForm({
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
            });
        }
    };

    return (
        <div ref={ref}>
            <div className="absolute top-10 left-1/2 -translate-x-1/2">
                <Slide in={error} mountOnEnter unmountOnExit>
                    <Alert severity="error">{alertMessage}</Alert>
                </Slide>
                <Slide in={success} mountOnEnter unmountOnExit>
                    <Alert severity="success">{alertMessage}</Alert>
                </Slide>
            </div>
            {/* name */}
            <TextField label="Name" variant="outlined" value={regisForm.name} onChange={(event) => setRegisForm({ ...regisForm, name: event.target.value })} error={error} className="w-full" />
            {/* email */}
            <TextField label="Email" variant="outlined" type="email" value={regisForm.email} onChange={(event) => setRegisForm({ ...regisForm, email: event.target.value })} error={error} className="w-full mt-2" />
            {/* password */}
            <FormControl variant="outlined" className="w-full mt-2">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                    label="Password"
                    value={regisForm.password}
                    onChange={(event) => setRegisForm({ ...regisForm, password: event.target.value })}
                    error={error}
                />
            </FormControl>
            {/* confirm password */}
            <FormControl variant="outlined" className="w-full mt-2">
                <InputLabel htmlFor="outlined-adornment-password">Re-password</InputLabel>
                <OutlinedInput
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                    label="Re-password"
                    value={regisForm.confirmPassword}
                    onChange={(event) => setRegisForm({ ...regisForm, confirmPassword: event.target.value })}
                    error={error}
                />
            </FormControl>
            <div className="flex flex-row-reverse">
                <p className="text-slate-500 hover:text-blue-600 cursor-pointer w-max h-max underline" onClick={switchForm}>
                    Login
                </p>
            </div>
            <Button variant="outlined" onClick={handleSubmit} className="w-full mt-4">
                Register
            </Button>
        </div>
    );
});

export default RegisterForm;

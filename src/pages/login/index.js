import LockIcon from "@mui/icons-material/Lock";
import GoogleIcon from "@mui/icons-material/Google";
import { useEffect, useState } from "react";
import Image from "next/image";
import LoginForm from "@/components/elements/LoginForm";
import { Button, Collapse } from "@mui/material";
import RegisterForm from "@/components/elements/RegisterForm";
import { useRouter } from "next/router";
import Oauth from "@/api/oauth.api";

const Login = () => {
    const oauth = new Oauth
    const [isRegister, setIsRegister] = useState(false);
    const router = useRouter()
    const switchForm = () => {
        setIsRegister(!isRegister);
    };
    const handleClick = ()=>{
        router.push("http://localhost:3000/auth/google")
    }
    useEffect(()=>{
        oauth.login()
    },[router.query.user])

    return (
        <>
            <div className={`grid grid-cols-3 h-screen bg-gradient-to-t ${isRegister ? "from-fuchsia-400" : "from-indigo-400"} to-white to-20%`} >
                {/* left side */}
                <div className="w-full h-full col-span-2 m-auto flex justify-center items-center">
                    <div className="bg-white w-3/4 h-1/2 flex-row ">
                        <p className="text-7xl text-center">
                            Welcome to <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent font-bold italic">Jimboz-Store</span>
                        </p>
                        <div className="flex justify-center mt-8">
                            <Image src={"/icon/largeicon.png"} width={300} height={300} alt="Icon" />
                        </div>
                        <p className="text-center text-2xl italic">
                            "Books are the quietest and most constant of friends; they are the most accessible and wisest of counselors, and the most patient of teachers."{" "}
                            <span className="text-slate-500 text-base italic underline">- Charles William Eliot</span>
                        </p>
                    </div>
                </div>
                {/* right side */}
                <div className="w-full h-full m-auto flex items-center">
                    <div className={`w-3/5 h-1/2 ${isRegister && "h-3/4"} bg-white rounded-lg border-4 border-indigo-500 shadow-xl grid grid-rows-10 p-4 transition-all duration-500`}>
                        <div className="bg-fuchsia-500 w-14 h-14 rounded-full text-white flex justify-center items-center justify-self-center row-span-2">
                            <LockIcon />
                        </div>
                        <div className="row-span-5 grid">
                            <Collapse in={!isRegister} mountOnEnter unmountOnExit>
                                <LoginForm switchForm={switchForm} />
                            </Collapse>
                            <Collapse in={isRegister} mountOnEnter unmountOnExit>
                                <RegisterForm switchForm={switchForm} />
                            </Collapse>
                        </div>
                        {/* <RegisterForm switchForm={switchForm} /> */}
                        <Button variant="contained" className="rounded-full border-8 border-black bg-indigo-300 hover:bg-indigo-500 text-slate-700 row-span-2 mt-8 h-10" onClick={handleClick}>
                            <GoogleIcon className="mr-2" />
                            Login by Google
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;

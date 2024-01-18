import Navbar from "@/components/layouts/Navbar";
import Cart from "@/components/layouts/Cart";
import { CartProvider } from "@/context/cart.context";
import { CategoryProvider } from "@/context/category.context";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AlertProvider } from "@/context/alert.context";
import MyAlert from "./Alert";

const AppShell = ({ children }) => {
    const [isNavbarShow, setIsNavbarShow] = useState(true);
    const router = useRouter();
    const setNavbar = () => {
        if (router.pathname === "/login") {
            setIsNavbarShow(false);
        } else {
            setIsNavbarShow(true);
        }
    };
    useEffect(() => {
        setNavbar();
    }, [router]);

    return (
        <>
            <AlertProvider>
                <MyAlert/>
                <CategoryProvider>
                    <CartProvider>
                        {isNavbarShow && <Navbar />}
                        {/* <Navbar /> */}
                        <Cart />
                        {children}
                    </CartProvider>
                </CategoryProvider>
            </AlertProvider>
        </>
    );
};

export default AppShell;

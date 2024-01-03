import React, { useState } from "react";
import Navbar from "@/components/layouts/Navbar";
import Cart from "@/components/layouts/Cart";
import { createContext } from "react";

export const cartContext = createContext([]);

const AppShell = ({ children }) => {
    const [state, setState] = useState(false);

    return (
        <>
            <cartContext.Provider value={[state, setState]}>
                <Navbar />
                <Cart />
            </cartContext.Provider>
            {children}
        </>
    );
};

export default AppShell;

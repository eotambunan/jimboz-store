import { createContext, useEffect, useState } from "react"
import CartApi from "@/api/cart.api";

const cartApi = new CartApi();


export const CartContext = createContext()

export const CartProvider = ({children})=>{
    const [isCartOpen,setIsCartOpen] = useState(false)
    const [cartItem, setCartItem] = useState([]);

    const fetchData = async () => {
        try {
            const response = await cartApi.get();
            if (response) {
                setCartItem(response[0].products);
            }            
        } catch (error) {
            console.error(error.message)
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    return(
        <CartContext.Provider value={[isCartOpen,setIsCartOpen,cartItem, setCartItem]}>
            {children}
        </CartContext.Provider>
    )
}


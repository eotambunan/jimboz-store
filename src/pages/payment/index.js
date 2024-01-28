import CartPayment from "@/components/elements/CartPayment"
import ListPayment from "@/components/elements/ListPayment"
import { CartContext } from "@/context/cart.context";
import { useContext, useMemo } from "react";

const Payment = ()=>{
    const [isCartOpen, setIsCartOpen, cartItem, setCartItem] = useContext(CartContext);
    const totalQuantity = useMemo(()=>{
        if(cartItem.length>0){
            const totalQuantity = cartItem.reduce((a,b)=>{
                return a+=b.quantity
            },0)
            return totalQuantity
        } else{
            return 0
        }
    },[cartItem])

    return(
        <div className="container mx-auto">
            <p className="text-4xl font-bold my-8">Keranjang <span className="text-sm text-slate-500 italic">({totalQuantity} item)</span></p>
            <div className="grid grid-cols-3 min-h-72">
                <div className="col-span-2 bg-yellow-200 rounded-xl w-11/12">
                    <CartPayment/>
                </div>
                <div className="col-span-1 bg-green-200 rounded-xl">
                    <ListPayment/>
                </div>

            </div>
        </div>
    )
}
export default Payment
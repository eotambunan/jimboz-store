import { CartContext } from "@/context/cart.context";
import { Button } from "@mui/material";
import Divider from "@mui/material-next/Divider";
import { useContext, useEffect, useMemo } from "react";
import PaymentApi from '@/api/payment.api'
import OrderApi from '@/api/order.api'
import CartApi from '@/api/cart.api'

const ListPayment = () => {
    const paymentApi = new PaymentApi
    const orderApi = new OrderApi
    const cartApi = new CartApi
    const [isCartOpen, setIsCartOpen, cartItem, setCartItem] = useContext(CartContext);
    
    const totalPrice = useMemo(()=>{
        if(cartItem.length>0){
            const total = cartItem.reduce((a,b)=>{
                return a+=b.item.price
            },0)
            return total
        } else {return 0}
    },[cartItem])

    const handleClick = async ()=>{
        try {
            const dataFiltered = cartItem.map((item)=>{
                return{
                    item:item.item._id,
                    quantity:item.quantity
                }
            })
            const orderId = await orderApi.add({
                totalPrice,
                products : dataFiltered
            })
            const response = await paymentApi.pay({
                price : totalPrice,
                order_id : orderId.data._id
            })
            window.snap.pay(response,{
                onSuccess : async function(){
                    await orderApi.setStatus(orderId.data._id)
                    await cartApi.deleteCart()
                },
                onError : function(){
                    alert("pembayaran gagal")
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
      
    return (
        <div className="p-4">
            <h1 className="text-2xl font-medium">Ringkasan Belanja</h1>
            <Divider variant="middle" className="my-4 border" />
            <div className="flex justify-between mt-8">
                <p className="text-xl">Total</p>
                <p className="text-3xl font-bold">Rp. {totalPrice}</p>
            </div>
            <Button className="w-full bg-indigo-500 hover:bg-indigo-700 text-white text-lg normal-case mt-20" onClick={handleClick}>Beli</Button>
            <div id="snap-container"></div>
        </div>
    );
};

export default ListPayment;

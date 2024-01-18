import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import { Divider, IconButton, ListItem, ListItemText } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Image from "next/image";
import { CartContext } from "@/context/cart.context";
import CartApi from "@/api/cart.api";

export default function Cart() {
    const cartApi = new CartApi();
    const [isCartOpen, setIsCartOpen, cartItem, setCartItem] = useContext(CartContext);
    const [] = useContext(CartContext);
    const [totalPrice, setTotalPrice] = useState([]);
    const [totalQuantity, setTotalQuantity] = useState("");

    const sumFunction = () => {
        if (cartItem.length > 0) {
            const totalPrice = cartItem.reduce((a, b) => {
                const price = b.item.price * b.quantity;
                const sum = a + price;
                return sum;
            }, 0);
            const totalQty = cartItem.reduce((a, b) => {
                const qty = b.quantity;
                const sum = a + qty;
                return sum;
            }, 0);
            setTotalPrice(totalPrice);
            setTotalQuantity(totalQty);
        } else {
            setTotalPrice(0);
            setTotalQuantity(0);
        }
    };
    const toggleDrawer = () => {
        setIsCartOpen(!isCartOpen);
    };
    const handleDelete = async (event, item_id) => {
        event.preventDefault();
        const response = await cartApi.delete(item_id);
        setCartItem(response[0].products);
    };
    useEffect(() => {
        sumFunction();
    }, [cartItem]);

    const DrawerContent = () => (
        <Box sx={{ width: 450 }} role="presentation">
            {cartItem.length > 0 ? (
                cartItem.map((item, index) => {
                    return (
                        <List sx={{ width: "100%", bgcolor: "background.paper" }} className="grid grid-cols-10 border-b border-slate-300 h-28 gap-2 p-2 pt-4 rounded-md" key={index}>
                            <div className="col-span-2 border-2 border-black rounded-md relative">
                                <Image src={"/coba.png"} fill objectFit="cover" alt="cart img" />
                            </div>
                            <ListItem
                                disableGutters
                                secondaryAction={
                                    <IconButton aria-label="comment" onClick={(event) => handleDelete(event, item._id)}>
                                        <DeleteIcon className="text-red-500 text-3xl" />
                                    </IconButton>
                                }
                                className="col-span-8 p-0"
                            >
                                <div className="flex-col flex h-full justify-between w-48">
                                    <h1>{item.item.title}</h1>
                                    <p className="text-indigo-500 font-bold text-lg italic">x{item.quantity}</p>
                                </div>
                                <div className="border-x-2 h-full w-28 flex justify-center items-center">
                                    <h4 className="text-indigo-500 font-bold text-lg">Rp. {item.item.price * item.quantity}</h4>
                                </div>
                            </ListItem>
                        </List>
                    );
                })
            ) : (
                <div className="bg-red-500 self-center">
                    <h1 className="text-2xl font-bold">Silahkan pilih barang belanjaan anda</h1>
                </div>
            )}
            <div className="w-[450px] h-24 fixed bottom-0 flex items-center justify-between px-4 border-t-4">
                <p className="text-3xl font-bold text-indigo-500">
                    Rp. {totalPrice} <span className="italic text-base text-slate-500">({totalQuantity} Item)</span>
                </p>
                <Button className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-full px-4">Checkout</Button>
            </div>
        </Box>
    );

    return (
        <div>
            <Drawer anchor="right" open={isCartOpen} onClose={toggleDrawer}>
                <DrawerContent />
            </Drawer>
        </div>
    );
}

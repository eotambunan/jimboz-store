import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Modal from "./Modal"
import { CartContext } from "@/context/cart.context";
import CartApi from "@/api/cart.api"
import { AlertContext } from "@/context/alert.context";

const MyCard = ({ data }) => {
    const cartApi = new CartApi
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false);
    const [dataProduct, setDataProduct] = useState([]);
    const [dataModal,setDataModal] = useState([])
    const [isCartOpen,setIsCartOpen,cartItem, setCartItem] = useContext(CartContext)
    const [isAlertOpen,setIsAlertOpen,alertMessage,setAlertMessage,alertColor,setAlertColor] = useContext(AlertContext)

    const {value} = router.query
    
    const handleIsOpen=(id)=>{
        dataForModal(id)
        setIsOpen(!isOpen)
    }
    const dataForModal = (id)=>{
        const filteredData = dataProduct.filter(item=>item._id===id)
        setDataModal(filteredData)
    }
    const handleAdd = async(productId)=>{
        try {
            const response = await cartApi.add(productId)
            if(response){
                const response = await cartApi.get()
                setIsAlertOpen(true)
                setAlertMessage("Produk berhasil ditambahkan")
                setAlertColor("success")
                setCartItem(response[0].products)
            } else {throw new Error}
        } catch (error) {
            console.error(error.message)
        }
    }
    useEffect(() => {
        setDataProduct(data);
    }, [data]);
    return (
        <div className="grid grid-cols-5">
            {/* Card */}
            {dataProduct.map((data) => {
                return (
                    <Card className="w-48 m-auto">
                        <CardMedia sx={{ height: 140 }} image="https://source.unsplash.com/random/cat" title="green iguana" />
                        <div className="p-2">
                            <h4 className="text-sm italic text-slate-400">{data.author}</h4>
                            <h1 className="text-base font-semibold">{data.title}</h1>
                            <h3 className="text-lg font-bold text-indigo-500">{data.price}</h3>
                            <h3 className="text-slate-500 line-through
                            
                            decoration-red-600 decoration-2">{data.price}</h3>
                        </div>
                        <CardActions className="flex justify-between">
                            <Button size="small" variant="contained" className="bg-indigo-500 hover:bg-indigo-700 rounded-l-full font-semibold normal-case" onClick={()=>handleIsOpen(data._id)}>
                                Detail
                            </Button>
                            <Button size="small" variant="contained" className="bg-fuchsia-500 hover:bg-fuchsia-700 rounded-r-full font-semibold normal-case" onClick={()=>{handleAdd(data._id)}}>
                                Add
                            </Button>
                        </CardActions>
                    </Card>
                );
            })}
            {/* Modal */}
            <Modal open={isOpen} close={handleIsOpen} data={dataModal} handleAdd={handleAdd} />
        </div>
    );
};

export default MyCard;

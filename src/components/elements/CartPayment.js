import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import { useContext } from "react";
import { CartContext } from "@/context/cart.context";
import Cart from "../../api/cart.api";
import { AlertContext } from "@/context/alert.context";

const cartApi = new Cart();
const CartPayment = () => {
    const [isCartOpen, setIsCartOpen, cartItem, setCartItem] = useContext(CartContext);
    const [isAlertOpen,setIsAlertOpen,alertMessage,setAlertMessage,alertColor,setAlertColor] = useContext(AlertContext)
    const handleDelete = async (id) => {
        const response = await cartApi.delete(id);
        setCartItem(response[0].products);
        setIsAlertOpen(true);
        setAlertMessage("Item berhasil dihapus");
        setAlertColor("error");
    };
    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableBody>
                    {cartItem.map((item) => {
                        return (
                            <>
                                <TableRow>
                                    <TableCell rowSpan={2} className="h-32 bg-orange-200 w-1/12">
                                        Gambar
                                    </TableCell>
                                    <TableCell rowSpan={2} className="w-6/12 text-xl">
                                        {item.item.title}
                                    </TableCell>
                                    <TableCell className="w-2/12 text-xl text-indigo-500 font-bold">Rp.{item.item.price}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="w-2/12 font-bold relative">
                                        x{item.quantity}
                                        <button className="absolute bottom-5 right-5" onClick={() => handleDelete(item._id)}>
                                            <DeleteIcon className="text-red-500 hover:text-red-700" />
                                        </button>
                                    </TableCell>
                                </TableRow>
                            </>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default CartPayment;

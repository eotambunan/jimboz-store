import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Badge, Button, FormHelperText } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/context/cart.context";
import { CategoryContext } from "@/context/category.context";
import CookieUtils from "../../../utils/cookie.utils";
import { useRouter } from "next/router";
import Link from "next/link";
import { RouteRounded } from "@mui/icons-material";

const cookie = new CookieUtils();
const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
    },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    width: "100%",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        [theme.breakpoints.up("sm")]: {
            width: "12ch",
            "&:focus": {
                width: "20ch",
            },
        },
    },
}));

export default function Navbar() {
    const [isCartOpen, setIsCartOpen, cartItem, setCartItem] = useContext(CartContext);
    const [category, setCategory] = useContext(CategoryContext);
    const [isLogin, setIsLogin] = useState(false);
    const [userName, setUserName] = useState("");
    const router = useRouter();
    const totalCartItem = cartItem.reduce((a, b) => {
        return (a += b.quantity);
    }, 0);

    const checkLogin = () => {
        const dataCookie = cookie.getCookie("user-access");
        if (dataCookie) {
            setIsLogin(true);
            setUserName(dataCookie.name);
        } else {
            setIsLogin(false);
        }
    };

    const handleCart = () => {
        setIsCartOpen(!isCartOpen);
    };

    const handleChange = (event) => {
        setCategory(event.target.value);
    };

    const handleClick = () => {
        if (isLogin) {
            cookie.removeCookie("user-access");
            router.reload();
        } else if (!isLogin) router.push("/login");
    };
    const handleOrder = ()=>{
        router.push("/order")
    }

    useEffect(() => {
        checkLogin();
    }, []);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar className="grid grid-cols-12 gap-2">
                    {/* Logo  */}
                    <div className="p-0 m-0 flex col-span-2 w-full justify-center">
                        <div className="w-1/5 h-12 relative">
                            <Link href={"/"}>
                            <Image src={"/icon/largeicon.png"} fill alt="icon" sizes="100" />
                            </Link>
                        </div>
                    </div>
                    {/* Filter */}
                    <FormControl className="bg-white rounded-md" size="small">
                        {/* <InputLabel id="demo-simple-select-label">Category</InputLabel> */}
                        <Select displayEmpty labelId="demo-simple-select-label" id="demo-simple-select" value={category} onChange={handleChange}>
                            <MenuItem value={""} className="bg-slate-300" hidden={category.length===0}>
                                Clear Filter
                            </MenuItem>
                            <MenuItem value={""} disabled hidden>
                            {category.length>0 ? category : "Category"}
                            </MenuItem>
                            <MenuItem value={"Comic"}>Comic</MenuItem>
                            <MenuItem value={"Children"}>Children</MenuItem>
                            <MenuItem value={"Novel"}>Novel</MenuItem>
                            <MenuItem value={"Biography"}>Biography</MenuItem>
                            <MenuItem value={"School"}>Novel</MenuItem>
                            <MenuItem value={"Religion"}>Religion</MenuItem>
                        </Select>
                    </FormControl>
                    {/* Search */}
                    <Search className="col-span-5">
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase placeholder="Search…" inputProps={{ "aria-label": "search" }} />
                    </Search>
                    {/* Icon */}
                    <div className="col-span-2 flex justify-evenly mt-1">
                        <Badge badgeContent={totalCartItem} color="secondary">
                            <IconButton color="primary" aria-label="add to shopping cart" className="text-white col-start-10 hover:rotate-12 hover:text-slate-300 transition-all" onClick={handleCart}>
                                <ShoppingCartIcon />
                            </IconButton>
                        </Badge>
                            <IconButton color="primary" aria-label="add to shopping cart" className="text-white col-start-10 hover:rotate-12 hover:text-slate-300 transition-all" onClick={handleOrder}>
                                <ChecklistRtlIcon />
                            </IconButton>
                    </div>
                    {/* Logout Button */}
                    <Button variant="contained" className={`${isLogin ? "bg-red-600 hover:bg-red-800" : "bg-green-600 hover:bg-green-800"} rounded-full w-1/2  p-2`} onClick={handleClick}>
                        {isLogin ? "LogOut" : "Login"}
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

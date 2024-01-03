import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { cartContext } from "./AppShell";

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
    const [category, setCategory] = React.useState("");
    const [state, setState] = React.useContext(cartContext);

    const handleCart = ()=>{
        setState(!state)
    }

    const handleChange = (event) => {
        setCategory(event.target.value);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar className="grid grid-cols-12 gap-2">
                    {/* Logo  */}
                    <IconButton size="large" edge="start" color="inherit" aria-label="open drawer" sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton>
                    {/* Company Name */}
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}>
                        Jimboz Store
                    </Typography>
                    {/* Filter */}
                    <FormControl fullWidth variant="filled" className="bg-white rounded-md" size="small">
                        <InputLabel id="demo-simple-select-label">Category</InputLabel>
                        <Select labelId="demo-simple-select-label" id="demo-simple-select" value={category} onChange={handleChange}>
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
                    {/* Cart */}
                    <IconButton color="primary" aria-label="add to shopping cart" className="text-white col-start-10 hover:rotate-12 hover:text-slate-300 transition-all" onClick={handleCart}>
                        <ShoppingCartIcon  />
                    </IconButton>
                    {/* Logout Button */}
                    <Button variant="contained" className="bg-red-600 rounded-full w-1/2 hover:bg-red-800 p-2">Logout</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

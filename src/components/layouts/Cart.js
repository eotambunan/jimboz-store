import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import { cartContext } from "./AppShell";

export default function Cart() {
    const [state,setState] = useContext(cartContext)

    const toggleDrawer = () => {
        setState(!state)
        console.log(state);
    };

    const DrawerContent = () => (
        <Box sx={{ width: 450 }} role="presentation" onClick={toggleDrawer}>
            <List>
                <h1>aselole</h1>
                <h1>aselole</h1>
                <h1>aselole</h1>
            </List>
        </Box>
    );

    return (
        <div>
            <Drawer anchor="right" open={state} onClose={toggleDrawer}>
                <DrawerContent />
            </Drawer>
        </div>
    );
}

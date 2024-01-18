import { Button, Modal } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";

const MyModal = ({ open, close, data, handleAdd }) => {
    const [dataModal, setData] = useState([]);
    const handleClick = ()=>{
        handleAdd(dataModal[0]._id)
        close()
    }
    useEffect(() => {
        setData(data);
    }, [data]);

    return (
        <Modal open={open} onClose={close} className="flex items-center">
            {dataModal.length>0? 
            <div className="w-1/2 h-3/5 bg-white border-8 border-indigo-500 m-auto flex-col rounded-xl p-4">
                <div className="w-full h-1/2 grid grid-cols-3">
                    {/* Image */}
                    <div className="col-span-1 border-4 rounded-lg border-fuchsia-500 relative">
                        <Image src={"https://source.unsplash.com/random/cat"} fill objectFit="contain" />
                    </div>
                    {/* Description */}
                    <div className=" col-span-2 text-3xl flex-col p-2">
                        <div className="border-2 rounded-full bg-gradient-to-r from-fuchsia-400 to-indigo-400 h-20 w-full flex items-center justify-center ">
                            <p className="text-2xl text-center px-2 font-medium text-black">{dataModal[0].title}</p>
                        </div>
                        <div className="bg-white mt-2 h-2/5 flex flex-col justify-around text-2xl">
                            <div className="grid grid-cols-6 ">
                                <p>Author</p>
                                <p className="col-span-2">: {dataModal[0].author}</p>
                                <p>Year</p>
                                <p className="col-span-2">: {dataModal[0].year}</p>
                            </div>
                            <div className="grid grid-cols-6">
                                <p>Category</p>
                                <p className="col-span-2">: {dataModal[0].category}</p>
                                <p>ISBN</p>
                                <p className="col-span-2">: {dataModal[0].isbn}</p>
                            </div>
                        </div>
                        <div className="flex justify-evenly mt-4">
                            <div className="bg-gradient-to-l border-2 rounded-full from-fuchsia-400 to-indigo-400 w-1/3 text-center p-1">Rp. {dataModal[0].price}</div>
                            <Button variant="contained" className="text-black bg-gradient-to-l border-2 rounded-full from-fuchsia-400 to-indigo-400 w-1/3 hover:bg-gradient-to-l hover:from-fuchsia-800 hover:to-indigo-800 font-semibold" onClick={()=>handleClick(dataModal[0]._id)}>
                                + Add to Cart
                            </Button>
                        </div>
                    </div>
                </div>
                {/* Synopsis */}
                <div className="bg-yellow-500 w-full h-1/2 p-2 border-4 border-fuchsia-500 rounded-lg mt-2 ">
                    <h1 className="text-4xl">Synopsis</h1>
                    <p className="text-justify indent-4 mt-2">
                    {dataModal[0].description}
                    </p>
                </div>
            </div>
            
            :
            <>sabar</>
        }

            
        </Modal>
    );
};

export default MyModal;

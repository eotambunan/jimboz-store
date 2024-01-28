import OrderApi from "@/api/order.api";
import { useEffect, useState } from "react";

const OrderList = () => {
    const orderApi = new OrderApi();
    const [dataOrder, setDataOrder] = useState([]);
    const fetchDataOrder = async () => {
        try {
            const data = await orderApi.get();
            const sortData = data.sort((a,b)=>new Date(b.created_at)-new Date(a.created_at))
            setDataOrder(sortData);
        } catch (error) {}
    };
    useEffect(() => {
        fetchDataOrder();
    }, []);
    return (
        <>
            {dataOrder.map((item) => {
                return (
                    <div className="min-h-64 p-4 border-2 border-slate-200 rounded-xl my-10">
                        <div className="h-10 flex justify-between">
                            <p>
                                {new Date(item.created_at).toLocaleDateString("id-ID", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                })}
                                {item.status==="success"?<span className="bg-indigo-400 rounded p-1 mx-2">Menunggu dikirim</span>:<span className="bg-red-500 rounded p-1 mx-2">dibatalkan</span>}
                            </p>
                            <p>No. pesanan : {item._id}</p>
                        </div>
                        <div className="h-max grid grid-cols-2">
                            {item.products.map((product) => {
                                return (
                                    <div className="h-32 flex mt-2 p-2">
                                        <div className="w-1/6 h-full bg-yellow-200">poto</div>
                                        <div className="w-3/6 h-full flex items-center">{product.item.title}</div>
                                        <div className="w-2/6 h-full bg-slate-200 flex items-center">x{product.quantity}</div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="flex justify-end mt-12">
                            <p className="text-2xl">
                                Total : <span className="font-bold text-indigo-500">Rp. {item.totalPrice}</span>
                            </p>
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default OrderList;

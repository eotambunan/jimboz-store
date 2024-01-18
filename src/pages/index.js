import Image from "next/image";
import { Inter } from "next/font/google";
import Cart from "@/components/layouts/Cart";
import Carousel from "@/components/elements/Carousel";
import Card from "@/components/elements/Card";
import { useContext, useEffect, useState } from "react";
import ProductApi from "@/api/product.api";
import { CategoryContext } from "@/context/category.context";

export default function Home() {
    const productApi = new ProductApi();
    const [dataProduct, setDataProduct] = useState([]);
    const [dataCard, setDataCard] = useState([]);
    const [category] = useContext(CategoryContext);

    const fetchDataProduct = async () => {
        try {
            const response = await productApi.getAll();
            setDataProduct(response);
        } catch (error) {
            console.error(error);
        }
    };

    const filterByCategory = () => {
        if (category.length != 0) {
            const categoryFilter = dataProduct.filter((item) => item.category === category.toLowerCase());
            setDataCard(categoryFilter);
        }else if(!category.length){
          setDataCard(dataProduct)
        }
    };
    // get Data
    useEffect(() => {
        fetchDataProduct();
    }, []);
    // get Data Card
    useEffect(() => {
        setDataCard(dataProduct);
    }, [dataProduct]);
    // get Data by Category
    useEffect(() => {
        filterByCategory();
    }, [category]);

    return (
        <>
            <Card data={dataCard} />
        </>
    );
}

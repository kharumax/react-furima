import React,{useContext} from "react";
import {ApiContext} from "../context/ApiContext";
import ProductsList from "./module/ProductsList";

const Main = () => {

    const {products,setProducts} = useContext(ApiContext);

    return (
        <div>
            <ProductsList products={products}/>
        </div>
    )
};

export default Main;

import React,{useContext} from "react";
import {ApiContext} from "../context/ApiContext";

const Main = () => {

    const {products,setProducts} = useContext(ApiContext);

    return (
        <div>
            HELLO WORLD
        </div>
    )
};

export default Main;

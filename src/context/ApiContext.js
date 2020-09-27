import React,{useEffect,useState,createContext} from "react";
import {withCookies} from "react-cookie";
import axios from "axios";

export const ApiContext = createContext();

const baseURL = process.env.REACT_APP_LOCAL_URL;

const ApiContextProvider = (props) => {
    const token = props.cookies.get("jwt-token");
    const [isLogin,setIsLogin] = useState(false);
    const [product,setProduct] = useState([]);
    const [products,setProducts] = useState([]);
    const [user,setUser] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await axios.get(baseURL+"/products/");
                setProducts(res.data);
                console.log(res.data);
            } catch (e) {
                console.log(e)
            }
        };
        getProducts();
    },[]);
    useEffect(() => {
        const getCurrentUser = async () => {
          try {
              const res = await axios.get(baseURL+"/get_current_user",{headers: {
                  "Content-Type": "application/json",
                  Authorization: `JWT ${token}`
                  }});
              setUser(res.data);
              setIsLogin(true);
              console.log(res.data)
          } catch (e) {
              console.log(e)
          }
        };
        if (token != null && token !== "") {
            getCurrentUser()
        }
    },[]);

    const getProduct = async (id) => {
        try {
            const res = await axios.get(baseURL+`/products/${id}/`);
            setProduct(res.data)
        } catch (e) {
            console.log(e)
        }
    };

    const newProduct = async (formData) => {
        try {
            const res = await axios.post(baseURL+"/products/create",formData,{headers: {
                    "Content-Type": "application/json",
                    Authorization: `JWT ${token}`
                }})
        } catch (e) {
            console.log(e)
        }
    };
    const updateProduct = async (id,formData) => {
        try {
            const res = await axios.put(baseURL+`/products/${id}/update/`,formData,{headers: {
                    "Content-Type": "application/json",
                    Authorization: `JWT ${token}`
                }})
        } catch (e) {
            console.log(e)
        }
    };

    // ex) /?keyword=test+test1
    const searchProductsByKeyword = async (keyword) => {
        try {
            const res = await axios.get(baseURL+`/products/?keyword=${keyword}`);
            setProducts(res.data)
        } catch (e) {
            console.log(e)
        }
    };
    // ex) /?categories=1
    const searchProductsByCategory = async (category) => {
        try {
            const res = await axios.get(baseURL+`/products/?categories=${category}`);
            setProducts(res.data)
        } catch (e) {
            console.log(e)
        }
    };
    const newOrder = async (productId) => {
        try {
            const res = await axios.post(baseURL+`/products/${productId}/order`,{headers: {
                    "Content-Type": "application/json",
                    Authorization: `JWT ${token}`
                }});
            setProducts(res.data)
        } catch (e) {
            console.log(e)
        }
    };


    return (
        <ApiContext.Provider value={
            {
                isLogin,
                setIsLogin,
                product,
                setProduct,
                products,
                setProducts,
                user,
                setUser,
                getProduct,
                newProduct,
                updateProduct,
                searchProductsByKeyword,
                searchProductsByCategory,
                newOrder
            }
        }>
            {props.children}
        </ApiContext.Provider>
    )

};

export default withCookies(ApiContextProvider);


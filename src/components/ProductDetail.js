import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import Header from "./module/Header";
import {ApiContext} from "../context/ApiContext";
import {CircularProgress} from "@material-ui/core";
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const baseURL = process.env.REACT_APP_LOCAL_URL;

const useStyles = makeStyles((theme) => ({
    root: {
        height: '90vh',
        marginTop: '50px'
    },
    image: {
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    title: {
        margin: theme.spacing(1),
        paddingRight: theme.spacing(3)
    },
    information: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const ProductDetail = () => {
    const { id } = useParams();
    const [isLoading,setIsLoading] = useState(true);
    const {product,setProduct,getProduct} = useContext(ApiContext);
    const classes = useStyles();

    useEffect(() => {
        getProduct(id);
        setIsLoading(false)
    },[id]);

    console.log(`This is product ${product}`);
    Object.keys(product).map((data) => {
        console.log(`This is ${data} : ${product[data]}`)
    });

    const renderProductDetail = () => {

        return (
            <Grid container component="main" className={classes.root}>
                <CssBaseline />
                  <Grid item sm={2} md={2}/>
                  <Grid container item sm={8} md={8}>
                    <Grid item xs={false} sm={4} md={7} className={classes.image} style={{backgroundImage: `url(${product.image_url})`}} />
                    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                        <div className={classes.paper}>
                            <Typography component="h1" variant="h2" className={classes.title}>
                                {product.title}
                            </Typography>
                            {/*タイトル*/}
                            {/*値段*/}
                            {/*カテゴリ名*/}
                            {/*出品者画像　出品者名*/}
                            <div className={classes.information}>
                                <p>{product.price}</p>
                                <p>{product.category_name}</p>
                                <p>{product.provider_name}</p>

                                <img src="" alt=""/>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        <p style={{fontSize: "30px",wordWrap: 'break-word'}}>
                            {product.description}
                        </p>
                    </Grid>
                </Grid>
            </Grid>
        )
    };

    return (
        <React.Fragment>
            <Header/>
            {isLoading ? <CircularProgress/> : renderProductDetail()}
        </React.Fragment>
    );
};

export default ProductDetail;
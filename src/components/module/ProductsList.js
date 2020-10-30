import React from "react";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Product from "./Product";

const useStyles = makeStyles((theme) => ({
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
}));

const ProductsList = ({products}) => {

    const classes = useStyles();

    return <main>
        <Container className={classes.cardGrid} maxWidth="md">
            <Grid container spacing={4}>
                {
                    products.map((product) => (
                        <Product key={product.id} product={product}/>
                    ))
                }
            </Grid>
        </Container>
    </main>
};

export default ProductsList;


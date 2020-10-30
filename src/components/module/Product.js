import React from 'react';
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '66.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    }
}));


const Product = ({product}) => {

    const classes = useStyles();

    const onClickMove = () => {
      window.location.href = `/products/${product.id}`
    };

    return (
        <Grid item  xs={12} sm={6} md={4} onClick={onClickMove} style={{cursor: "pointer"}}>
            <Card className={classes.card}>
                <CardMedia
                    className={classes.cardMedia}
                    image={product.product_image}
                    title="Image title"
                />
                <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {product.title}
                    </Typography>
                    <Typography>
                        {product.description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" color="primary">
                        ¥{product.price}
                    </Button>
                    <Button size="small" color="primary">
                        カテゴリ:{product.category_name}
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default Product;
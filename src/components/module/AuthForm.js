import React,{useReducer,useContext} from "react";
import {ApiContext} from "../../context/ApiContext";
import {makeStyles} from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import {TextField} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import {withCookies} from "react-cookie";
import axios from "axios";

import {START_FETCH,FETCH_SUCCESS,ERROR_CATCHED,INPUT_EDIT} from "../actionTypes";

const useStyles = makeStyles((theme) => ({
    title: {
        textDecoration: "none"
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3),
    },
    span: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: 'teal',
    },
    spanError: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: 'fuchsia',
        marginTop: 10,
    },
}));

const loginReducer = (state, action) => {
    switch (action.type) {
        case START_FETCH: {
            return {
                ...state,
                isLoading: true,
            };
        }
        case FETCH_SUCCESS: {
            return {
                ...state,
                isLoading: false,
            };
        }
        case ERROR_CATCHED: {
            return {
                ...state,
                error: 'Email or password is not correct !',
                isLoading: false,
            };
        }
        case INPUT_EDIT: {
            return {
                ...state,
                [action.inputName]: action.payload,
                error: '',
            };
        }
        default:
            return state;
    }
};

const AuthForm = (props) => {
    const classes = useStyles();
    const {isLogin,setIsLogin} = useContext(ApiContext);
    const baseURL = process.env.REACT_APP_LOCAL_URL;
    const initialState = {
        isLoading: false,
        isLoginView: true,
        error: "",
        credentialsLog: {
            email: "",
            password: ""
        },
    };
    if (props.authType === "signUp") {
        initialState.isLoginView = false
    }
    const [state,dispatch] = useReducer(loginReducer,initialState);

    const inputChangedLog = () => event => {
        const cred = state.credentialsLog;
        cred[event.target.name] = event.target.value;
        dispatch({
            type: INPUT_EDIT,
            inputName: "state.credentialsLog",
            payload: cred,
        })
    };

    const login = async(event) => {
        event.preventDefault();
        if(state.isLoginView) {
            // Loginの場合の処理
            try {
                dispatch({type: START_FETCH});
                const res =  await axios.post(`${baseURL}/auth/jwt/create/`,state.credentialsLog ,{
                    headers: { 'Content-Type': 'application/json'}});
                props.cookies.set('jwt-token', res.data.access);
                setIsLogin(true);
                console.log(`This is res : ${res.data}`);
                res.data.access ?  window.location.href = "/" : window.location.href = "/login";
                dispatch({type: FETCH_SUCCESS})
            } catch (e) {
                dispatch({ type: ERROR_CATCHED});
                console.log(e)
            }
        } else {
            // SignUpの場合の処理
            try {
                dispatch({type: START_FETCH});
                await axios.post(`${baseURL}/signup/`,state.credentialsLog ,{
                    headers: { 'Content-Type': 'application/json'},});

                const res =  await axios.post(`${baseURL}/auth/jwt/create/`,state.credentialsLog ,{
                    headers: { 'Content-Type': 'application/json'}});
                props.cookies.set('jwt-token', res.data.access);
                setIsLogin(true);
                res.data.access ?  window.location.href = "/" : window.location.href = "/login";
                dispatch({type: FETCH_SUCCESS})
            } catch (e) {
                dispatch({ type: ERROR_CATCHED});
                console.log(e)
            }
        }
    };

    return (
        <Container maxWidth="xs" >
            <form onSubmit={login}>
                <div className={classes.paper}>
                    <h1><a href="/" className={classes.title}>Deema</a></h1>
                    {state.isLoading && <CircularProgress />}
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography variant="h5">
                        {state.isLoginView ? 'ログイン' : '会員登録'}
                    </Typography>

                    <TextField
                        variant="outlined" margin="normal"
                        fullWidth label="Email"
                        name="email"
                        value={state.credentialsLog.email}
                        onChange={inputChangedLog()}
                        autoFocus/>

                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="password"
                        value={state.credentialsLog.password}
                        onChange={inputChangedLog()}
                        label="Password"
                        type="password"/>

                    <span className={classes.spanError}>{state.error}</span>

                    { state.isLoginView ?
                        !state.credentialsLog.password || !state.credentialsLog.email ?
                            <Button className={classes.submit} type="submit" fullWidth disabled
                                    variant="contained" color="primary">Login</Button>
                            : <Button className={classes.submit} type="submit" fullWidth
                                      variant="contained" color="primary">Login</Button>
                        :
                        !state.credentialsLog.password || !state.credentialsLog.email ?
                            <Button className={classes.submit} type="submit" fullWidth disabled
                                    variant="contained" color="primary">Register</Button>
                            : <Button className={classes.submit} type="submit" fullWidth
                                      variant="contained" color="primary">Register</Button>
                    }

                    <span className={classes.span}>
                        {state.isLoginView ?
                            <a href="/signup" style={{textDecoration: "none"}} >会員登録はこちら</a>
                            :
                            <a href="/login" style={{textDecoration: "none"}} >ログインはこちら</a>
                        }
                    </span>
                </div>
            </form>
        </Container>
    )
};

export default withCookies(AuthForm);
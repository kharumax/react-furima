import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Route,BrowserRouter,Switch} from "react-router-dom";
import {CookiesProvider} from "react-cookie";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import ApiContextProvider from "./context/ApiContext";
import ProductDetail from "./components/ProductDetail";

ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
              <CookiesProvider>
                  <ApiContextProvider>
                      <Switch>
                          <Route exact path="/" component={App}/>
                          <Route exact path="/signup" component={SignUp}/>
                          <Route exact path="/login" component={Login}/>
                          <Route exact path="/products/:id/" component={ProductDetail}/>
                      </Switch>
                  </ApiContextProvider>
              </CookiesProvider>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

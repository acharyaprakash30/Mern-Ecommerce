import './App.css';
import Header from './component/layout/Header/Header.js';
import Footer from './component/layout/Footer/Footer.js';
import {BrowserRouter as Router,Route} from "react-router-dom"
import WebFont from "webfontloader";
import React,{useEffect} from "react";
import Home from './component/Home/Home.js';
import ProductDetails from './component/Product/ProductDetails.js';
import Products from './component/Product/Products';
import LoginSignUp from './component/User/LoginSignUp';

function App() {

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  }, []);

  return (
    <Router>
   <Header />
    <Route exact path="/"  component={Home} />
    <Route exact path="/product/:id" component={ProductDetails} />
    <Route exact path="/products" component={Products} />
    <Route exact path="/login" component={LoginSignUp} />
   <Footer />
    </Router>
  );
}

export default App;

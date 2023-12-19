import React from "react";
import {  BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Products from "./Products";
import Home from "./Home";
import ProductDetails from "./ProductDetails";
import Cart from "./Cart";
import PurchaseConfirmation from "./PurchaseConfirmation";
import GlobalStyles from "./GlobalStyles";
import NavBar from "./NavBar";
import Footer from "./Footer";


const App = () => {
    return (
    <React.Fragment>
        <GlobalStyles />
        <Router>        
        <NavBar />
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/products" element={<Products/>} />
                <Route path="/products/:itemId" element={<ProductDetails/>} />
                <Route path="/cart" element={<Cart/>} />
                <Route path="/confirmation" element={<PurchaseConfirmation/>} />
                <Route path="/products/category/:category" element={<Products/>} />
            </Routes>
            <Footer />
        </Router>
    </React.Fragment>
    )
}

export default App;
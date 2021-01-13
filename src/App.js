import './App.css';
import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { render } from '@testing-library/react';
//imports for icons
import {BiCart,BiCollection}  from "react-icons/bi";
import { AiOutlineHeart } from "react-icons/ai";
//imports for required components
import AllItems from "./components/all-items.component";
import MyProfile from "./components/my-profile.component";
import MyWishlist from "./components/my-wishlist.component";
import MyCart from "./components/my-cart.component";
import MyOrders from "./components/my-orders.component";

function App() {
  return (
    <div>
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      {/* <a href="/" className="navbar-brand"> */}
        {/* SINDRA */}
      {/* </a> */}
      <Link to={"/customer/"} className="navbar-brand">
        SINDRA
      </Link>
      <div className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link to={"/customer/home"} className="nav-link">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to={"/customer/my-profile"} className="nav-link">
            My Profile
          </Link>
        </li>
      </div>
      <div className="navbar-nav mr">
        <li className="nav-item">
          <Link to={"/customer/my-orders"} className="nav-link">
            <BiCollection title="My Orders"/>
          </Link>
        </li>
        <li className="nav-item">
          <Link to={"/customer/wish-list"} className="nav-link">
            <AiOutlineHeart title="My Wishlist"/>
          </Link>
        </li>
        <li className="nav-item">
          <Link to={"/customer/cart"} className="nav-link">
            <BiCart title ="Cart"/>
          </Link>
        </li>
      </div>
    </nav>

    <div className="container mt-3">
      <Switch>
        <Route exact path={["/customer/","/customer/home"]} component={AllItems} />
        <Route exact path="/customer/my-profile" component={MyProfile} />
        <Route exact path="/customer/cart" component={MyCart}/>
        <Route exact path="/customer/my-cart" component={MyCart}/>
        <Route exact path="/customer/wish-list" component={MyWishlist}/>
        <Route exact path="/customer/my-wishlist" component={MyWishlist}/>
        <Route exact path="/customer/my-orders" component={MyOrders}/>
      </Switch>
    </div>
  </div>
  );
}

export default App;

import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import ProductDetails from "./product/ProductDetails";
import ProductList from "./product/ProductList";
import { Navigate } from "react-router-dom";
import ShoppingCart from "./shoppingcart/ShoppingCart";
import { Home } from "./Home";
import UserDetails from "./user/UserDetails";
import { Footer } from "./Navigation/Footer";
import Checkout from "./shoppingcart/Checkout";
import CheckoutForm from "./shoppingcart/CheckoutForm";
import { OrderConfirmation } from "./shoppingcart/OrderConfirmation";

export default function ApplicationViews({ isLoggedIn, user }) {
  return (
    <main>
      <Routes>
        <Route path="/">
          <Route
            index
            element={isLoggedIn ? <Home user={user} /> : <Navigate to="/login" />}
          />

          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          <Route path="product" element={isLoggedIn ? <ProductList user={user} /> : <Navigate to="/login" />} />

          <Route path="shoppingCart" element={isLoggedIn ? <ShoppingCart user={user} /> : <Navigate to="/login" />} />

          <Route path="shoppingcart/checkout" element={isLoggedIn ? <Checkout user={user} /> : <Navigate to="/login" />} />


          <Route path="shoppingcart/checkout/form" element={isLoggedIn ? <CheckoutForm user={user} /> : <Navigate to="/login" />} />
          <Route path="order/confirmation" element={isLoggedIn ? <OrderConfirmation user={user} /> : <Navigate to="/login" />} />


          <Route path="productDetails/:id" element={isLoggedIn ? <ProductDetails user={user} /> : <Navigate to="/login" />
          } />
          <Route path="/userprofile/details/:id" element={isLoggedIn ?
            <UserDetails user={user} /> : <Navigate to="/login" />
          } />

        </Route>
      </Routes>
      <Footer />

    </main>
  )
};
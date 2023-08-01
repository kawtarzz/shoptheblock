import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import ProductDetails from "./product/ProductDetails";
import ProductList from "./product/ProductList";
import { Navigate } from "react-router-dom";
import ShoppingCart from "./shoppingcart/ShoppingCart";

// 
export default function ApplicationViews({ isLoggedIn, user }) {
  return (
    <main>
      <Routes>
        <Route path="/">
          <Route
            index
            element={isLoggedIn ? <ProductList /> : <Navigate to="/login" />}
          />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="product" element={isLoggedIn ? <ProductList /> : <Navigate to="/login" />} />

          <Route path="ShoppingCart" element={isLoggedIn ? <ShoppingCart /> : <Navigate to="/login" />} />
          <Route path="productDetails/:id" element={isLoggedIn ? <ProductDetails user={user} /> : <Navigate to="/login" />
          } />

        </Route>
      </Routes>
    </main>
  )
};
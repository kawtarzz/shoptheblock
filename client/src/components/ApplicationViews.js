import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ProductDetails from "./product/ProductDetails";
// import Logout from "./Logout";
import ProductList from "./product/ProductList";
import { Navigate } from "react-router-dom";


export default function ApplicationViews({ isLoggedIn }) {
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
          <Route path="productDetails/:id" element={<ProductDetails />} />
        </Route>
      </Routes>
    </main>


  )
};
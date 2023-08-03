import { Form, Button, ButtonGroup } from "reactstrap";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle, Input } from "reactstrap";
import CheckoutForm from "./CheckoutForm";

export default function Checkout({ user, firebaseUserId, cartItem, cartItems }) {
  const navigate = useNavigate();
  const location = useLocation();

  console.log(cartItems, "cartItems")
  const sendToOrder = () => {
    navigate(`/order/confirmation`, { state: { background: location } })
  };
  const confirmCheckout = () => {
    // cartItems.ShoppingComplete = true;
    // setCart([...cart]);
    navigate(`/checkout/form`, { state: { background: location } })
  }

  console.log(cartItems, "cartItems")

  return (
    <>
      <Card>
        <div className=" col-xs-12 col-sm-8 col-lg-4">
          <h1>Checkout</h1>
          <hr></hr>
          <p> Shopping Cart Summary:</p>
          <p> Item: ItemName</p>
          <p>Item Price: Price</p>
          <p>Quantity: Quantity</p>
          <p>Subtotal: Subtotal</p>
          <p>Tax: Tax</p>
          <p>Total: Total</p>
        </div>
      </Card >


      <div className="col-xs-12 col-sm-8 col-lg-4">
        <div className="row d-flex justify-content-end">
          <ButtonGroup>
            <Button color="secondary" size="sm" onClick={() => navigate(`/product`, { state: { background: location } })}>Continue Shopping</Button>
            <Button color="secondary" size="sm" onClick={() => navigate(`/shoppingcart`)}>Back to Shopping Cart</Button>
            <Button color="primary" size="sm" onClick={confirmCheckout}>Confirm Checkout</Button>
          </ButtonGroup>
        </div>
      </div>
    </>
  )
}
{/* <CheckoutForm user={user} cartItem={cartItem} cartItems={cartItems} /> */ }


import { Form, Button, ButtonGroup } from "reactstrap";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { Card, CardBody, CardImg, CardSubtitle, CardText, CardHeader, CardFooter, CardTitle, Input } from "reactstrap";
import { getUserCartByFirebaseId } from "../../modules/cartManager";

export default function Checkout({ user, cartItems }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [cart, setCart] = useState([]);
  const sendToOrder = () => {
    navigate(`/order/confirmation`, { state: { background: location } })
  };
  const firebaseUserId = user.firebaseUserId;

  useEffect(() => {
    getUserCartByFirebaseId(user.firebaseUserId).then(setCart);
  }, [])

  const confirmCheckout = () => {
    // cartItems.ShoppingComplete = true;
    // setCart([...cart]);
    navigate(`/shoppingcart/checkout/form`, { state: { background: location } })
  }

  return (
    <>
      <Card className="row d-flex">
        {cart.map((cartItem) => (
          <div key={cartItem.id} >
            {cartItem.product.name}
            <br></br>
            <h5>{cartItem.product.name}</h5>
            Price: ${cartItem.product.price * cartItem.quantity}
            <br></br>
            Quantity: {cartItem.quantity}
            <br></br>

          </div>
        ))}
        <hr></hr>
        <div className="box">
          <center>
            <CardFooter>

              <CardHeader tag="h4">
                Total: $<i>
                  {cart.reduce((sum, cartItem) => sum + (cartItem.product.price * cartItem.quantity), 0)}
                </i>
              </CardHeader>
              <div className="row d-flex justify-content-start">
                <ButtonGroup>
                  <Button color="secondary" size="sm" onClick={() => navigate(`/product`, { state: { background: location } })}>Continue Shopping</Button>
                  <Button color="secondary" size="sm" onClick={() => navigate(`/shoppingcart`)}>Back to Shopping Cart</Button>
                  <Button color="primary" size="sm" onClick={confirmCheckout}>Confirm Checkout</Button>
                </ButtonGroup>
              </div>
            </CardFooter>
          </center>
        </div>
      </Card >
    </>
  )
}

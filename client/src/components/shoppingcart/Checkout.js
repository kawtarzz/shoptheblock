import { Form, Button, ButtonGroup, ListGroup, ListGroupItem, ListGroupItemHeading } from "reactstrap";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { Card, CardBody, CardImg, CardSubtitle, CardText, CardHeader, CardFooter, CardTitle, Input } from "reactstrap";
import CheckoutForm from "./CheckoutForm";
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
      <Card style={{ width: '60rem' }}>
        {cart.map((cartItem) => (
          <div key={cartItem.id} >
            <ListGroup>
              <ListGroupItem>
                <ListGroupItemHeading tag="h6">
                  {cartItem.product.name}

                </ListGroupItemHeading>
                Price: ${cartItem.product.price * cartItem.quantity}
                <br></br>
                Quantity: {cartItem.quantity}
                <br></br>
              </ListGroupItem>
            </ListGroup>

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
{/* <CheckoutForm user={user} cartItem={cartItem} cartItems={cartItems} /> */ }

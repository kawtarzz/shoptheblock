import React, { useEffect, useState } from 'react';
import { Button, Card, ButtonGroup, CardTitle, CardHeader, CardFooter } from 'reactstrap';
import { getUserCartByFirebaseId } from '../../modules/cartManager';
import CartItem from './CartItem';
import { useLocation, useNavigate } from 'react-router-dom';
import CheckoutForm from './Checkout';
import Checkout from './Checkout';
import { deleteCartItem } from '../../modules/cartManager';
import { updateCart } from '../../modules/cartManager';

const ShoppingCart = ({ user, cartItem, cart, products, product }) => {
  const [cartItems, setCartItems] = useState([])
  const [updateCartItem, setUpdateCartItem] = useState({});
  const firebaseUserId = user.firebaseUserId;
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    getUserCartByFirebaseId(firebaseUserId).then(setCartItems);
  }, [])

  const updateQuantity = (cartItem, quantity) => {
    cartItem.quantity = quantity;
    updateCart(cartItem).then(getUserCartByFirebaseId(firebaseUserId).then(setCartItems))
  }
  // delete not working
  const handleDelete = (cartItem) => {
    deleteCartItem(cartItem.id).then(getUserCartByFirebaseId(firebaseUserId).then(setCartItems))
  }

  const handleCheckout = () => {
    getUserCartByFirebaseId(firebaseUserId).then(setCartItems);
    navigate(`/shoppingcart/checkout`, { state: { background: location } })
  };


  useEffect(() => {
    getUserCartByFirebaseId(firebaseUserId).then(setCartItems);
  }, [])

  return (
    <>
      <Card>
        <CardTitle tag="h3">Shopping Cart</CardTitle>
        <hr></hr>
        <div className="col">
          {cartItems.map((cartItem) => (
            <div key={cartItem.id} >
              <div className="box" style={{ size: "20%" }}>
                <img src={cartItem.product.productImage} />
                <br></br><h6>
                  {cartItem.product.productName}
                </h6>
                <br></br>
                <h5>{cartItem.product.name}</h5>
                Price: ${cartItem.product.price * cartItem.quantity}
                <br></br>
                Quantity: {cartItem.quantity}
                <br></br>
                <ButtonGroup>
                  <Button color="primary" size="sm" onClick={() => updateQuantity(cartItem, cartItem.quantity + 1)}>+</Button>
                  <Button color="primary" size="sm" onClick={() =>
                    updateQuantity(cartItem, cartItem.quantity - 1)}>-</Button>

                  <Button color="secondary" size="sm" onClick={() => handleDelete(cartItem)}>Remove Item</Button>
                </ButtonGroup>
                <hr></hr>
              </div>
            </div>
          ))}
          <CardFooter>
            <h5>Subtotal: ${cartItems.reduce((sum, cartItem) => sum + (cartItem.product.price * cartItem.quantity), 0)}</h5>
            <Button color="primary" size="sm" onClick={handleCheckout}>Proceed to Checkout</Button>

          </CardFooter>
        </div>
      </Card>
    </>
  );
};

export default ShoppingCart;


export const handleTotal = (cartItems) => {
  const total = cartItems.reduce((sum, cartItem) => sum + (cartItem.product.price * cartItem.quantity), 0)
}
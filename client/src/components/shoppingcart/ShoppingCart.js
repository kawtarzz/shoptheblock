import React, { useEffect, useState } from 'react';
import { Button, Card, ButtonGroup, CardTitle, CardHeader, CardFooter } from 'reactstrap';
import { getUserCartByFirebaseId } from '../../modules/cartManager';
import CartItem from './CartItem';
import { useLocation, useNavigate } from 'react-router-dom';
import CheckoutForm from './Checkout';

const ShoppingCart = ({ user, cartItem, cart, products, product }) => {
  const [cartItems, setCartItems] = useState([])
  const firebaseUserId = user.firebaseUserId;
  const location = useLocation();
  const navigate = useNavigate();


  useEffect(() => {
    getUserCartByFirebaseId(firebaseUserId).then(setCartItems);
  }, [])


  const updateQuantity = (cartItem, quantity) => {
    cartItem.quantity = quantity;
    setCartItems([...cartItems])
  }
  // delete not working
  const deleteCartItem = (cartItem) => {
    deleteCartItem(cartItem.id).then(getUserCartByFirebaseId(firebaseUserId).then(setCartItems))
  }


  const handleCheckout = () => {
    setCartItems([...cartItems])

    navigate(`/checkout`, { state: { background: location } })
  };



  return (
    <>
      <Card>
        <CardTitle tag="h3">Shopping Cart</CardTitle>
        <hr></hr>
        <div className="col">
          {cartItems.map((cartItem) => (
            <div key={cartItem.id} >
              <img src={cartItem.productImage} />
              <br></br><h6>
                Product Name: {cartItem.productName}
              </h6>
              {console.log(product, cartItem, "product", "cartItem")}

              <h5>{cartItem.productName}</h5>
              Price: ${cartItem.productPrice * cartItem.quantity}
              <br></br>
              Quantity: {cartItem.quantity}
              <br></br>
              <ButtonGroup>
                <Button color="primary" size="sm" onClick={() => updateQuantity(cartItem, cartItem.quantity + 1)}>+</Button>
                <Button color="primary" size="sm" onClick={() =>
                  updateQuantity(cartItem, cartItem.quantity - 1)}>-</Button>

                <Button color="secondary" size="sm" onClick={() => deleteCartItem(cartItem)}>Remove Item</Button>
              </ButtonGroup>
              <hr></hr>
            </div>
          ))}
          <CardFooter>
            <h5>Subtotal: ${cartItems.reduce((sum, cartItem) => sum + (cartItem.productPrice * cartItem.quantity), 0)}</h5>
            <Button color="primary" size="sm" onClick={handleCheckout}>Proceed to Checkout</Button>
          </CardFooter>
        </div>
      </Card>
    </>
  );
};

export default ShoppingCart;
// { cartItem.product?.productImage }
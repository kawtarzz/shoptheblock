import React, { useState } from 'react';
import CartItem from './CartItem';
import { ButtonGroup, Button } from 'reactstrap';


const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    const { productId, productName, productImage, price, quantity, userId } = product;
    const newCartItem = new CartItem(productId, productName, productImage, price, quantity, userId);
    setCartItems([...cartItems, newCartItem]);

  };

  const handleCheckout = () => {
    // navigate(`/checkout`, { state: { background: location } })
  };

  const renderCartItems = () => {
    return cartItems.map((item) => (
      <div key={item.productId}>
        <img src={item.productImage} alt={item.productName} />
        <p>{item.productName}</p>
        <p>{item.price}</p>
      </div>
    ));
  };

  return (
    <div>
      {renderCartItems()}
      <ButtonGroup>
        <Button color="primary" size="sm" onClick={handleCheckout}>Checkout</Button>
      </ButtonGroup>
    </div>


  );
};


export default ShoppingCart;

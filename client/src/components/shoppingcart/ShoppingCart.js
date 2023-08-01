import React, { useState } from 'react';
import CartItem from './CartItem';
import { ButtonGroup, Button } from 'reactstrap';


const ShoppingCart = ({ user }) => {
  const [cartItems, setCartItems] = useState([]);


  const handleCheckout = () => {
    // navigate(`/checkout`, { state: { background: location } })
  };

  const renderCartItems = () => {
    return cartItems.map((c) => (
      <div key={c.productId}>
        <img src={c.productImage} alt={c.productName} />
        <p>{c.productName}</p>
        <p>{c.price}</p>
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

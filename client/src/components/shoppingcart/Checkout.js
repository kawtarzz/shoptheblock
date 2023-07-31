import { Form, Button, ButtonGroup } from "reactstrap";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { getProductDetails } from "../../modules/productManager";
import { getUserByFirebaseUserId } from "../../modules/userManager";
import { Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle, Input } from "reactstrap";
import { addToCart } from "../../modules/cartManager";

export default function CheckoutForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams(), [product, setProduct] = useState({});
  const [user, setUser] = useState({});
  const [quantity, setQuantity] = useState(1);
  const currentUser = JSON.parse(sessionStorage.getItem("user"));
  const [cartItem, setCartItem] = useState({
    productId: product.id,
    userId: user.Id,
    quantity: quantity,

  });

  const getUser = () => {
    getUserByFirebaseUserId(currentUser.firebaseUserId).then(setUser);
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleCheckout = () => {
    navigate(`/checkout`, { state: { background: location } })
  };

  const sendToOrder = () => {
    navigate(`/order/confirmation`, { state: { background: location } })
  };


  return (
    <div>
      <h1>Checkout</h1>
      <Form>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <Input
            type="text"
            name="name"
            id="name"
            placeholder="Enter your name"
            required
          />


          <label htmlFor="address">Address</label>
          <Input
            type="text"
            name="address"
            id="address"
            placeholder="Entr your address"
            required
          />
          <label htmlFor="city">City</label>
          <Input
            type="text"
            name="city"
            id="city"
            placeholder="Enter your city"
            required
          />
          <label htmlFor="state">State</label>
          <Input
            type="text"
            name="state"
            id="state"
            placeholder="Enter your state"
            required
          />
          <label htmlFor="zip">Zip</label>
          <Input
            type="text"
            name="zip"
            id="zip"
            placeholder="Enter your zip"
            required
          />
          <label htmlFor="phone">Phone</label>
          <Input
            type="text"
            name="phone"
            id="phone"
            placeholder="Enter your phone"
            required
          />
          <label htmlFor="email">Email</label>
          <Input
            type="text"
            name="email"
            id="email"
            placeholder="Enter your email"
            required />
        </div>
        <ButtonGroup>
          <Button color="primary" size="sm" onClick={handleCheckout}>Checkout</Button>
        </ButtonGroup>
      </Form>
    </div>

  )
}

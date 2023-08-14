import { Form, Button, ButtonGroup } from "reactstrap";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle, Input } from "reactstrap";
import { addToCart } from "../../modules/cartManager";
import { getUserCartByFirebaseId } from "../../modules/cartManager";
import { getPaymentTypes } from "../../modules/checkoutManager";

export default function CheckoutForm({ user, setCart }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [paymentTypes, setPaymentTypes] = useState([]);
  const [open, setOpen] = useState(false);

  const orderConfirmation = () => {
    navigate(`/order/confirmation`, { state: { background: location } })
  }

  const handleOpen = () => {
    setOpen(!open);
  }


  useEffect(() => {
    getPaymentTypes().then(setPaymentTypes);
    getUserCartByFirebaseId(user.firebaseUserId).then(setCart);
  }, []);


  return (
    <Card>
      <Form>
        <div className="row d-flex justify-content-end">
          <div className="col">
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
              <label htmlFor="creditCard">Select Payment</label>
              <Input
                type="select"
                name="creditCard"
                id="creditCard"
                placeholder="Select Payment"
                required>
                {paymentTypes.map((paymentType) => (
                  <option key={paymentType.id} value={paymentType.name} >{paymentType.name}</option>
                ))}
              </Input>


            </div>
          </div>
          <Button color="primary" size="sm" onClick={orderConfirmation}>Submit Order</Button>
        </div>
      </Form>
    </Card>
  )
}
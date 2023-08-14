import userEvent from '@testing-library/user-event';
import React from 'react';
import { Link } from 'react-router-dom';
import { CardFooter, CardHeader, Card, CardBody, CardSubtitle, ButtonGroup, CardText, Button } from 'reactstrap';
import { CardTitle } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

export const OrderConfirmation = () => {
  const navigate = useNavigate();

  return (
    <>
      <Card className="box-checkout" style={{ width: '60rem' }}>
        <CardHeader>
          <CardTitle tag="h3">
            Thank you for your order!
          </CardTitle>
          <CardSubtitle className="text-muted" tag="h6">
            You will receive an email confirmation shortly.
            <hr></hr>
            <br></br>
            <h5>
              <b>Order Number:</b>
              <i> 123456789</i>
            </h5>
          </CardSubtitle>
          <div>

            Order Status: Processing <br></br>
            Order Date: 08/05/2023 <br></br>
            Order Total: $100.00
          </div>
          <hr></hr>
        </CardHeader>
        <ButtonGroup>
          <Button color="primary" size="sm" onClick={() => navigate("/product")}>Continue Shopping</Button>
          <Button color="primary" size="sm">View Orders</Button>
        </ButtonGroup>
      </Card>
    </>
  )
}
//
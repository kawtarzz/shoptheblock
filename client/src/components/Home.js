import * as React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardFooter, CardHeader, CardTitle, CardImg, CardText, Button, ButtonGroup, ButtonDropdown, CardSubtitle } from 'reactstrap';

export const Home = ({ user }) => {

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h1" style={{ fontFamily: "monospace" }}>
          Shop the Block
        </CardTitle>
        <br />
        <CardSubtitle tag="h6" >Shop the Block is a local shopping marketplace that allows you to shop from local artists in your area!</CardSubtitle>
        <hr></hr>




      </CardHeader>
      <CardBody>
        <CardText>Here are some of our featured products</CardText>
      </CardBody>


    </Card>
  );
}
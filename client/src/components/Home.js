import * as React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardFooter, CardHeader, CardTitle, CardImg, CardText, Button, ButtonGroup, ButtonDropdown, CardSubtitle } from 'reactstrap';
import { getProducts } from '../modules/productManager';
import { useEffect, useState } from 'react';
import Product from './product/Product';

export const Home = ({ user }) => {

  return (
    <Card className="container" style={{ display: "flex", width: "80%" }}>
      <CardHeader>
        <CardTitle tag="h1" style={{ fontFamily: "monospace" }}>
          Welcome to
          Shop the Block
        </CardTitle>
        <CardSubtitle tag="h6" className="mb-2 text-muted">Shop Local, Shop Small</CardSubtitle>
        <br />
        <CardSubtitle tag="h6" >Shop the Block is a local shopping marketplace that allows you to shop from local artists in your area!</CardSubtitle>
        <hr></hr>
      </CardHeader>
      <CardBody>
        <CardText>
          <CardTitle>
            Here are some of our featured products
          </CardTitle>
        </CardText>
        <ProductGallery />

        <CardText>
          <br />
          <Link to="/product">
            <Button color="primary">Shop All</Button>
          </Link>
        </CardText>
      </CardBody>
    </Card>
  );
};

const ProductGallery = () => {
  const [products, setProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  useEffect(() => {
    const featuredProducts = products.filter((product) => product.featured === true);
    setFeaturedProducts(featuredProducts);
  }, [products]);


  return (
    <div className="row">
      {featuredProducts.map((product) => (
        <div key={product.id} className="
              col-xs-12
                  col-sm-8
                  col-lg-4">
          <Product key={product.id} product={product} />
        </div>
      ))}
    </div>
  );
};

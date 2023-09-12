import React, { useEffect, useState } from "react";
import Product from "./Product";
import { getProducts } from "../../modules/productManager";
import { Card, Button, ButtonGroup } from "reactstrap";
import { Input } from "reactstrap";
import "./Product.css";
import Container from "reactstrap/lib/Container";
import Label from "reactstrap/lib/Label";
import Row from "reactstrap/lib/Row";
import Col from "reactstrap/lib/Col";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  // fetches all products from the database and sets the state
  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  // filters products based on search term
  const handleSearch = () => {
    if (searchTerm === "") {
      getProducts().then(setProducts);
    } else {
      const searchResults = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      // sets the state to the filtered results
      setProducts(searchResults);
    }
  };

  const handleCategoryFilter = (categoryName) => {
    // if the user clicks the same category button twice, reset the state
    setSelectedCategory(categoryName === "all" ? null : categoryName);


  };

  // extract unique category names from products
  const categoryNames = [...new Set(products.map((p) => p.category.name))]

  const filteredProducts = selectedCategory ? products.filter((p) => p.category.name === selectedCategory) : products;

  return (
    <>
      <Container
        className="justify-content-center">
        <Card>
          <Row>
            <Col sm={2}>
              <Label htmlFor="label-text">Filter by Category: </Label>
              <select
                name="category"
                id="category"
                onChange={(evt) => handleCategoryFilter(evt.target.value)}
              >
                <option value="all">All Products</option>
                {categoryNames.map((categoryName) => (
                  <option key={categoryName} value={categoryName}>
                    {categoryName}
                  </option>
                ))}
              </select>
            </Col>
          </Row>
          <Row>

            <Col xs={{ order: 12 }}>

              <Label htmlFor="label-text">Sort by: </Label>

              <Button onClick={() => {
                const sortedProducts = [...products].sort((a, b) => a.price - b.price)
                setProducts(sortedProducts)
              }}>Price: Lowest first</Button>

              <Col xs={{ order: 1 }}>
                <div className="p-4 me-auto inline">
                  <Label htmlFor="label-text">Search: </Label>
                  <Input className="me-auto"
                    placeholder="Search for a product"
                    value={searchTerm}
                    onChange={(evt) => setSearchTerm(evt.target.value)} />
                  <Button variant="secondary" onClick={handleSearch}>Search</Button>
                </div>
              </Col>

            </Col>
          </Row>
        </Card>
        <Card>
          <Row>
            {filteredProducts.map((product) => (
              <div key={product.id} className="
                col-xs-12
                col-sm-8
                col-lg-4">
                <Product key={product.id} product={product} />
              </div>
            ))}
          </Row>
        </Card>
      </Container >
    </>
  );
}
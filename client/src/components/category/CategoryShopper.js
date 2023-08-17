import React, { useEffect, useState } from "react";
import { Label, ButtonGroup, Button, Row, Col } from "reactstrap";
import { Input } from "reactstrap";
import { getProducts } from "../../modules/productManager";


export const SortByCategoryButtons = ({ categoryName, handleCategoryFilter, categoryNames }) => {
  return (
    <>
      <div className="p-4 me-auto inline">
        <Row>
          <Col sm={2}>
            <Label htmlFor="label-text">
              Filter by Category:
            </Label>
            <ButtonGroup>
              <Button color="primary" size="sm" onClick={() => handleCategoryFilter(null)}>All Products</Button>
              {categoryNames.map((categoryName) => (

                <Button
                  key={categoryName} outline color="primary" size="sm"
                  onClick={() => handleCategoryFilter(categoryName)}>
                  {categoryName}
                </Button>
              ))}
            </ButtonGroup>
          </Col>
        </Row>
      </div>
    </>
  )
};

export const CategoryDropdown = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const categoryNames = [...new Set(products.map((p) => p.category.name))]

  const getProducts = () => {
    return fetch("/api/product")
      .then((res) => res.json())
      .then(setProducts);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleCategoryFilter = (categoryName) => {
    setSelectedCategory(categoryName === "all" ? null : categoryName);
  };


  const filteredProducts = selectedCategory ? products.filter((p) => p.category.name === selectedCategory) : products;

  return (
    <>
      <div className="p-4 me-auto inline">
        <Row>
          <Col sm={2}>
            <Label htmlFor="label-text">
              Filter by Category:
            </Label>
            <select
              name="category"
              id="category"
              onChange={(evt) => handleCategoryFilter(evt.target.value)}
            >
              <option value="all">
                All Products
              </option>
              {categoryNames.map((categoryName) => (
                <option
                  key={categoryName}
                  value={categoryName}>
                  {categoryName}
                </option>
              ))}
            </select><br />
          </Col>
        </Row>
      </div>
    </>
  )
}
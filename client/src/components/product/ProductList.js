import React, { useEffect, useState } from "react";
import Product from "./Product";
import { getProducts, searchProducts } from "../../modules/productManager";
import { ButtonGroup, Card } from "reactstrap";
import { Input, Button } from "reactstrap";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  const handleCategoryFilter = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  const handleSearch = () => {
    if (searchTerm === "") {
      getProducts().then(setProducts);
    } else {
      searchProducts(searchTerm).then(setProducts);
    }
  };

  // extract unique category names from products
  const categoryNames = [...new Set(products.map((p) => p.category.name))]

  const filteredProducts = selectedCategory ? products.filter((p) => p.category.name === selectedCategory) : products;

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <Input
            type="text"
            placeholder="Search for a product"
            value={searchTerm}
            onChange={(evt) => setSearchTerm(evt.target.value)}
          />
          <Button color="primary" size="sm" onClick={handleSearch}>Search</Button>
        </div>
        <h1>Products</h1>
        <div>
          <div>
            <Button color="primary" size="sm" onClick={() => handleCategoryFilter(null)}>All Products</Button>

            {categoryNames.map((categoryName) => (
              <Button
                key={categoryName} outline color="primary" size="sm"
                onClick={() => handleCategoryFilter(categoryName)}
              >
                {categoryName}
              </Button>
            ))}
          </div>
          <div className="card">
            <div className="row">
              {filteredProducts.map((product) => (
                <div key={product.id} className="
                  col-xs-12
                  col-sm-8
                  col-lg-4">
                  <Product key={product.id} product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


import React, { useEffect, useState } from "react";
import Product from "./Product";
import { getProducts } from "../../modules/productManager";
import { Card, Button, ButtonGroup } from "reactstrap";

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
    setSelectedCategory(categoryName);
  };

  // extract unique category names from products
  const categoryNames = [...new Set(products.map((p) => p.category.name))]

  const filteredProducts = selectedCategory ? products.filter((p) => p.category.name === selectedCategory) : products;

  return (
    <><Card>
      <div className="row justify-content-center">
        <input
          type="text"
          placeholder="Search for a product"
          value={searchTerm}
          onChange={(evt) => setSearchTerm(evt.target.value)}
        />
        <Button color="primary" size="sm" onClick={handleSearch}>Search</Button>
      </div>
      <h1>Products</h1>
      <div className="button-group">
        <ButtonGroup>
          <Button color="primary" size="sm" onClick={() => handleCategoryFilter(null)}>All Products</Button>

          {categoryNames.map((categoryName) => (
            <Button
              key={categoryName} outline color="primary" size="sm"
              onClick={() => handleCategoryFilter(categoryName)}
            >
              {categoryName}
            </Button>
          ))}
        </ButtonGroup>
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
    </Card>
    </>
  );
}


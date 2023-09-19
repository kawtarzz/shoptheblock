import React, { useEffect, useState } from "react";
import Product from "./Product";
import { getProducts } from "../../modules/productManager";
import "./Product.css";
import { SortByCategoryButtons } from "../category/CategoryShopper";


export default function ProductList() {
  const [products, setProducts] = useState([]);
  // category filter state variable 
  const [selectedCategory, setSelectedCategory] = useState(null);
  // sets all categories to null

  const handleCategoryFilter = (categoryName) => {
    setSelectedCategory(categoryName === "all" ? null : categoryName);
  };

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  const categoryNames = [...new Set(products.map((p) => p.category.name))]

  const filteredProducts = selectedCategory ? products.filter((p) => p.category.name === selectedCategory) : products;

  return (
    <>
      <SortByCategoryButtons categoryName={selectedCategory} handleCategoryFilter={handleCategoryFilter} categoryNames={categoryNames} />
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
    </>
  );
}

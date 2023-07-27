import React, { useEffect, useState } from "react";
import Product from "./Product";
import { getProducts } from "../../modules/productManager";
import { Card } from "reactstrap";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  return (
    <>
      <h1>Products</h1>
      <div class="card">
        <div class="row">
          {products.map((product) => (
            <div key={product.id} class="
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
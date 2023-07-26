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
      <Card className="products">
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </Card>
    </>
  );
}
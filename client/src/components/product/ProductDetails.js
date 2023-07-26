import { useParams } from "react-router-dom";
import { getProductDetails } from "../../modules/productManager";
import { useEffect, useState } from "react";


export default function ProductDetails() {
  const { id } = useParams(),
    [product, setProduct] = useState({});

  useEffect(() => {
    getProductDetails(id).then(setProduct);
  }, [])

  if (product === null) {
    return <p>Sorry, there is no product with id of {id}</p>
  }

  else {
    return (
      <div className="m-4 text-center">
        <h3>{product.name}</h3>
        <img src={product.productImage}
          alt="product-header-img"
          className="mt-5 mb-5"
          width="100%" height="200px" />
        <p>{product.description}</p>
        <p>{product.price}</p>
      </div>
    )
  }
}
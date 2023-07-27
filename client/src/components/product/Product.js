import React from "react";
import { Link, useNavigate } from "react-router-dom"
import { useLocation } from 'react-router-dom'
import { Card } from "reactstrap"

export default function Product({ product }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleDetails = () => {
    navigate(`/productDetails/${product.id}`, { state: { background: location } })
  }

  return (
    <Card className="m-4" style={{ 'borderRadius': '5px' }}>

      <p className="text-left px-2">Name: {product.name}</p>
      <div>
        <img height="20%" width="20%" src={product.productImage} alt={product.name} />
      </div>
      <p className="text-left px-2">Description: {product.description}</p>
      <p className="text-left px-2">Category: {product.category.name}</p>

      <p className="text-left px-2">Price: ${product.price}</p>
      <p className="text-left px-2">Quantity: {product.stock}</p>
      <button className="btn btn-primary" onClick={handleDetails}>Details</button>
    </Card>
  )
}
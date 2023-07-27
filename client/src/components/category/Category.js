import Card from "react-bootstrap/Card";
import CardBody from "react-bootstrap/CardBody";
import { useNavigate, useLocation } from "react-router-dom";
import React from "react";


export default function Category({ category }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleCategoryClick = () => {
    navigate(`/categories/${category.id}`, { state: { background: location } });
  }

  return (
    <Card className="m-4" style={{ width: "18rem" }}>
      <CardBody>
        <p className="text-left px-2">{category.name}</p>
        <button className="btn btn-secondary" onClick={handleCategoryClick}>View Products</button>
      </CardBody>
    </Card>
  );
}
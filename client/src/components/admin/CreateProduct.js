import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { addProduct } from "../../modules/productManager";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from "reactstrap";

export default function CreateProduct() {
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const toggle = () => setOpen(!open);

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    productImage: "",
    categoryId: "",
    stock: "",
    featured: false,
    dateCreated: "",
    dateModified: "",
  });

  const handleInputChange = (evt) => {
    const value = evt.target.value;
    const key = evt.target.id;

    const productCopy = { ...product };

    productCopy[key] = value;
    setProduct(productCopy);
  };

  const handleSave = (evt) => {
    evt.preventDefault();
    const productCopy = { ...product };
    productCopy.dateCreated = new Date();
    productCopy.dateModified = new Date();
    productCopy.categoryId = parseInt(product.categoryId);
    productCopy.price = parseFloat(product.price);
    productCopy.stock = parseInt(product.stock);
    productCopy.featured = Boolean(product.featured);
    productCopy.productImage = product.productImage;
    addProduct(productCopy).then((p) => {
      history.push(`/product/${p.id}`);
    });
  };

  return (
    <>
      <Button color="primary" onClick={toggle}>
        Add Product
      </Button>
      <Modal isOpen={open} toggle={() => setOpen(false)}>
        <ModalHeader toggle={() => setOpen(false)}>Add Product</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                id="name"
                onChange={handleInputChange}
                required
                autoFocus
                type="text"
                name="name"
                placeholder="product name"
                value={product.name}
              />
            </FormGroup>
            <FormGroup>
              <Label for="description">Description</Label>
              <Input

                id="description"
                onChange={handleInputChange}
                required
                autoFocus
                type="text"
                name="description"
                placeholder="product description"
                value={product.description}
              />
            </FormGroup>
            <FormGroup>
              <Label for="price">Price</Label>
              <Input id="price"
                onChange={handleInputChange}
                required
                autoFocus
                type="text"
                name="price"
                placeholder="product price"
                value={product.price}
              />
            </FormGroup>
            <FormGroup>
              <Label for="productImage">Product Image</Label>
              <Input id="productImage"
                onChange={handleInputChange}
                required
                autoFocus
                type="text"
                name="productImage"
                placeholder="product image"
                value={product.productImage}
              />
            </FormGroup>
            <FormGroup>
              <Label for="categoryId">Category</Label>
              <Input id="categoryId"
                onChange={handleInputChange}
                required
                autoFocus
                type="select"
                name="categoryId"
                placeholder="product category"
                value={product.categoryId}
              >
                <option value="0">Select a Category</option>
                <option value="1">Art</option>
                <option value="2">Clothing</option>
                <option value="3">Home Goods</option>
                <option value="4">Jewelry</option>
                <option value="5">Other</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="stock">Stock</Label>
              <Input id="stock"
                onChange={handleInputChange}
                required
                autoFocus
                type="text"
                name="stock"
                placeholder="product stock"
                value={product.stock}
              />
            </FormGroup>
            <FormGroup>
              <Label for="featured">Featured</Label>
              <Input id="featured"
                onChange={handleInputChange}
                required
                autoFocus
                type="radio"
                name="featured"
                placeholder="product featured"
                value={product.featured}
              >
                <option value="true">Feature</option>
                <option value="false">Not Featured</option>
              </Input>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSave}>
            Save
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}





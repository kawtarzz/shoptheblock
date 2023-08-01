import { useParams } from "react-router-dom";
import { getProductDetails } from "../../modules/productManager";
import { useEffect, useState } from "react";
import { Card, Button, ButtonGroup } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom'
import { CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import { Input } from "reactstrap";
import { addToCart } from "../../modules/cartManager";
import { getUserCartByFirebaseId } from "../../modules/cartManager";


export default function ProductDetails({ user }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams(), [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [cartItem, setCartItem] = useState({});
  const [cart, setCart] = useState({});

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleCheckout = () => {
    navigate(`/checkout`, { state: { background: location } })
  };


  useEffect(() => {
    getProductDetails(id).then(setProduct);
  }, []);


  const handleAddToCart = () => {
    const cartItem = {
      productId: product.id,
      quantity: quantity,
      userId: user.id,
      shoppingComplete: false,
    };
    console.log(cartItem, "item added")
    addToCart(cartItem).then(() => {
      setCartItem(cartItem)
    });
  };

  useEffect(() => {
    getUserCartByFirebaseId(user.firebaseUserId).then(setCart);
  }, []);



  const handleOpenShoppingCart = () => {

    navigate(`/ShoppingCart`, { state: { background: location } })
  };


  if (product === null) {
    return <p>Sorry, there is no product with id of {id}</p>
  } else {
    return (
      <Card key={product.id} >
        <Button color="primary" size="x-sm" onClick={handleOpenShoppingCart}>Shopping Cart</Button>
        <Button color="primary" size="x-sm" onClick={() => navigate(`/product`)}>Back to Products</Button>
        <CardTitle tag="h5">{product.name}</CardTitle>
        <CardSubtitle tag="h6" className="mb-2 text-muted">{product.category?.name}</CardSubtitle>
        <CardImg top width="100%" src={product.productImage} alt="Card image cap" />
        <CardBody>
          <CardText>{product.description}</CardText>
          <CardText>Price: ${product.price}</CardText>
          <CardText>Quantity:</CardText>
          <Input
            type="number"
            min="1"
            max={product.stock}
            value={quantity}
            onChange={handleQuantityChange}
          />
        </CardBody>
        <ButtonGroup>
          <Button color="primary" size="sm" onClick={handleAddToCart}>Add to Cart</Button>

          <Button color="primary" size="sm" onClick={handleCheckout}>Checkout</Button>
        </ButtonGroup>




      </Card >
    )
  }
}
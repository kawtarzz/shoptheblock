import { useParams } from "react-router-dom";
import { getProductDetails } from "../../modules/productManager";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom'
import { Card, Button, ButtonGroup, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import { Input } from "reactstrap";
import { addToCart } from "../../modules/cartManager";
import { getUserCartByFirebaseId } from "../../modules/cartManager";
import ShoppingCart from "../shoppingcart/ShoppingCart";
import CartItem from "../shoppingcart/CartItem";


export default function ProductDetails({ user }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams(), [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [cartItem, setCartItem] = useState({});
  const [cart, setCart] = useState([]);
  const [isLowStock, setIsLowStock] = useState(false);
  const [isProduct, setIsProduct] = useState(false);

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleCheckout = () => {
    //checkout confirmation page - order summary
    navigate(`/checkout`, { state: { background: location } })
  };


  useEffect(() => {
    getProductDetails(id).then(setProduct);
  }, []);


  const handleAddToCart = () => {
    if (cartItem.productId === product.id) {
      const newCartItem = { ...cartItem };
      newCartItem.userId = user.id;
      newCartItem.product = product;
      newCartItem.quantity = quantity;
      newCartItem.productId = product.id;
      newCartItem.productImage = product.productImage;
      newCartItem.productName = product.name;
      newCartItem.productPrice = product.price;
      newCartItem.productDescription = product.description;
      newCartItem.productCategory = product.category;
      newCartItem.productStock = product.stock;
      newCartItem.shoppingComplete = false;
      addToCart(newCartItem).then(() => {
        cart.push(newCartItem);
        setCart([...cart]);

      }
      )
    }
  }

  // } else {
  //   const cartItem = {
  //     productId: product.id,
  //     quantity: quantity,
  //     userId: user.id,
  //     shoppingComplete: false,
  //   };
  //   addToCart(cartItem).then(() => {
  //     cart.push(cartItem);
  //     setCart([...cart]);
  //   });

  useEffect(() => {
    getUserCartByFirebaseId(user.firebaseUserId).then(setCart);
  }, []);

  const handleOpenShoppingCart = () => {
    navigate(`/shoppingCart`, { state: { background: location } })
  };

  useEffect(() => {
    if (product.stock <= 5 && product.stock > 0) {
      setIsLowStock(true)
    }
  }, [product])


  if (product === null) {
    return <p>Sorry, there is no product with id of {id}</p>
  } else {
    return (<>
      <Card key={product.id} >
        <CardTitle tag="h5">{product.name}</CardTitle>
        <CardSubtitle tag="h6" className="mb-2 text-muted">{product.category?.name}</CardSubtitle>
        <CardImg top width="100%" src={product.productImage} alt="Card image cap" />
        <CardBody>
          <hr></hr>
          <CardText>{product.description}</CardText>
          <CardText>Price: ${product.price}</CardText>
          <CardSubtitle tag="h6" className="mb-2 text-muted">
            {isLowStock ? `Hurry! Only ${product.stock} left in stock!` : `In Stock: ${product.stock}`}
          </CardSubtitle>
          <CardText>Quantity:</CardText>
          <Input
            type="number"
            min="1"
            max={product.stock}
            value={quantity}
            onChange={handleQuantityChange}
          />
          <ButtonGroup>
            <Button color="primary" size="sm" onClick={handleAddToCart}>Add to Cart</Button>
            <Button color="primary" size="sm" onClick={handleOpenShoppingCart}>View Cart</Button>
            <Button color="primary" size="sm" onClick={handleCheckout}>Checkout</Button>
          </ButtonGroup>
        </CardBody>
      </Card >
      {/* <CartItem key={product.id} user={user} cartItem={cartItem} /> */}
      {/* <ShoppingCart key={cartItem.id} user={user} cartItem={cartItem} product={product} cart={cart} /> */}
    </>
    )
  }
}



import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom'
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, CardHeader } from 'reactstrap';
import { Button } from 'reactstrap';
import { Input } from "reactstrap";
import { addToCart, deleteCartItem } from "../../modules/cartManager";
import { getUserCartByFirebaseId } from "../../modules/cartManager";
import ShoppingCart from "../shoppingcart/ShoppingCart";


export default function CartItem({ cartItem, product, user, cart, setCart, setCartItem, handleCheckout }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [quantity, setQuantity] = useState(cartItem.quantity);
  const [cartItems, setCartItems] = useState([])


  const handleQuantityChange = (e) => {
    const newQuantity = e.target.value;
    if (newQuantity < 1) {
      deleteCartItem(cartItem.id).then(() => {
        const updatedCart = cart.filter((item) => item.id !== cartItem.id);
        setCart(updatedCart);
      }
      )
    } else {
      const newCartItem = { ...cartItem };
      newCartItem.quantity = newQuantity;
      addToCart(newCartItem).then(() => {
        cart.push(newCartItem);
        setCart([...cart]);
      });
    }
  }


  useEffect(() => {
    getUserCartByFirebaseId(user.firebaseUserId).then(setCartItems);
  }, []);

  return (
    <>
      <Card className="m-4" style={{ 'borderRadius': '3px' }}>
        <CardTitle tag="h5">
          {cartItem.productId}
          <p> hello </p>
        </CardTitle>
        <hr></hr>
        <CardSubtitle tag="h6" className="mb-2 text-muted">
          {cartItem.product?.category?.name}
        </CardSubtitle>
        <CardImg top width="100%" src={cartItem.product?.productImage} alt="Product Image" />
        <CardBody>
          <CardText>
            <CardHeader>
              <CardImg top width="100%" src={cartItem.product?.productImage} alt="Product Image" />
              {/* {cartItem.product.name} */}
            </CardHeader>
            <hr></hr>
            {cartItem.product?.description}
            <br></br>
            {/* <b>Price:</b> ${cartItem.product.price} */}
            <br></br>
            <CardText>Quantity:</CardText>
            <Input
              type="number"
              min="1"
              // max={product.stock}
              value={quantity}
              onChange={handleQuantityChange}
            />
            <br></br>
          </CardText>
        </CardBody>
      </Card >
      <div>

        <Button color="primary" size="x-sm" onClick={() => navigate("/checkout")}>Checkout</Button>

      </div>
    </>


  )
}

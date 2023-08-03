import firebase from "firebase/app"
import "firebase/auth";
import { getToken } from "./authManager";

const apiUrl = "/api/shoppingCart";

export const getUserCartByFirebaseId = (firebaseUserId) => {
  return getToken().then((token) => {
    return fetch(`${apiUrl}/GetUserCartByFirebaseId/${firebaseUserId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("An unknown error occurred while trying to fetch the cart.");
      }
    });
  });
};

export const getShoppingCart = () => {
  return getToken().then((token) => {
  return fetch(apiUrl, {
  method: "GET",
  headers: {
    Authorization: `Bearer ${token}`
  },
  }).then((res)=>{  
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("An unknown error occurred while trying to fetch the cart.");
    }
      })
    })
  };


export const addToCart = (cartItem) => {
    return getToken().then((token) => {
      return fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartItem),
      }).then((res) => {
        if (res.ok) {
          window.alert("Item added to cart!")
          console.log(cartItem, "item added")
          return res.json();
        } else {
          throw new Error("An unknown error occurred while trying to save a new cart item.");
        }
      }
      );
    });
  };



  export const updateCart = (cart) => {
    return getToken().then((token) => {
      return fetch(`${apiUrl}/${cart.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cart),
      });
    });
  };

  

  export const deleteCartItem = (id) => {
    return getToken().then((token) => {
      return fetch(`${apiUrl}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    });
  };
  



  //         will need to create a new post request to update the cart table
  //         and send the product id and the user id to the cart table
  //         cart should be a dropdown menu on the nav bar that is accessible from any page
  //         and will display the products in the cart and the total price of the cart items 
  //         when the user clicks on the cart button on the nav bar it will take them to the cart page when the user selects proceed to checkout it will take them to the checkout page where they will enter their payment info and complete the purchase
  //       when the purchase is complete the user will receive a confirmation number and the cart will be cleared & a put request will be made to update the stock of the product in the product table and send the order to the order table
   // create checkout form
  // create order confirmation page
  // create order details table
  // create order details manager
  
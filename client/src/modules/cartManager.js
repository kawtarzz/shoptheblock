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
    }).then((res) => {
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


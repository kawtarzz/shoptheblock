import { getToken } from "./authManager";

const apiUrl = "/api/product";

export const getProducts = () => {
  return getToken().then((token) => {
    return fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error(
          "An unknown error occurred while trying to get posts.",
        );
      }
    });
  });
};

export const getProductDetails = (id) => {

  return getToken().then(token => {
    return fetch(`${apiUrl}/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error(
          "An unknown error occurred while trying to get products.",
        );
      }
    });
  });
}

export const AddProduct = (product) => {
  return getToken().then((token) => {
    return fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(product)
    }).then((resp) => {
      if (resp.ok) {
        console.log("Product listing made successfully!")
        return resp.json();
      } else {
        throw new Error(
          "An error occurred while trying to add a product listing.",
        );
      }
    });
  });
}
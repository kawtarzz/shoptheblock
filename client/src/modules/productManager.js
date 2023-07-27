import { getToken } from "./authManager";

const apiUrl = "/api/product";

export const getProducts = () => {
  return getToken().then((token) => {
    return fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      },
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
};

export const searchProducts = (searchTerm) => {
  return fetch(`${apiUrl}/search?q=${searchTerm}`).then((resp) => {
    if (resp.ok) {
      return resp.json();
    } else {
      throw new Error(
        "An unknown error occurred while trying to search for products.",
      );
    }
  });
};

export const getProductDetails = (productId) => {
  return getToken().then((token) => {
    return fetch(`${apiUrl}/${productId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      },
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error(
          "An unknown error occurred while trying to get product details.",
        );
      }
    });
  })
};

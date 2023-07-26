import { getToken } from "./authManager";

const apiUrl = "/api/order";

export const getAllOrders = () => {
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
          "An unknown error occurred while trying to get orders.",
        );
      }
    });
  });
};

export const getOrderDetails = (orderId) => {

  return getToken().then(token => {
    return fetch(`${apiUrl}/${orderId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error(
          "An unknown error occurred while trying to get orders.",
        );
      }
    });
  });
}


export const getCustomerOrders = () => {
  return getToken().then((token) => {
    return fetch(`${apiUrl}/customerOrders`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error(
          "An unknown error occurred while trying to get customer orders.",
        );
      }
    });
  });
};

export const Addorder = (order) => {
  return getToken().then((token) => {
    return fetch(apiUrl, {
      method: "order",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(order)
    }).then((resp) => {
      if (resp.ok) {
        console.log("order made successfully!")
        return resp.json();
      } else {
        throw new Error(
          "An error occurred while trying to add a order.",
        );
      }
    });
  });
}
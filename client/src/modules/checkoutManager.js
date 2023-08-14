import firebase from "firebase/app"
import "firebase/auth";
import { getToken } from "./authManager";

export const getPaymentTypes = () => {
  return getToken().then((token) => {
    return fetch(`/api/paymentType`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => res.json())
  })
}
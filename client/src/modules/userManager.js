import { getToken } from "./authManager";

const baseUrl = "/api/User";

export const getAllUsers = () => {
  return getToken().then(token => {
    return fetch(baseUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(res => res.json())
  })
};

export const getUserDetailsById = (id) => {
  return getToken().then(token => {
    return fetch(`${baseUrl}/details/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
  })
}

export const updateUser = (userObj) => {
  return getToken().then(token => {
    return fetch(`${baseUrl}/${userObj.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: userObj.id,
        fullName: userObj.fullName,
        email: userObj.email,
        password: userObj.password,
        profilePic: userObj.profilePic
      })
    })
      .then(res => res.json())
  })
}
import { getToken } from "./authManager";

const baseUrl = "/api/userprofile";

// this module is responsible for all fetch calls to the userprofile table in the database
// user has access to these controls when logged in

export const getUserDetailsById = (userId) => {
  return getToken().then(token => {
    return fetch(`${baseUrl}/details/${userId}`, {
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
import { getToken } from "./authManager";

const baseUrl = "/api/User";

export const registerUser = (user) => {
  return getToken().then((token) => {
    return fetch(`${baseUrl}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(user),
    }).then((res) => res.json());
  });
};



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

export const getUser = (firebaseUserId) => {
  return getToken().then(token => {
    return fetch(`${baseUrl}/${firebaseUserId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        if (res.status === 404) {
          return null
        } else {
          return res.json()
        }
      })
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
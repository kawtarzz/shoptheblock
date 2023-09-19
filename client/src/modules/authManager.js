import firebase from "firebase/app"
import "firebase/auth";

const _apiUrl = "/api/userprofile";

// this module is responsible for all the authentication and authorization
// admin only has access to the user profiles

export const getUserDetails = (firebaseUUID) => {
  return getToken().then(token => {
    return fetch(`${_apiUrl}/${firebaseUUID}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => res.json())
  })
}

const _doesUserExist = (firebaseUserId) => {
  return getToken().then((token) =>
    fetch(`${_apiUrl}/DoesUserExist/${firebaseUserId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(resp => resp.json()));
};


const _saveUser = (user) => {
  return getToken().then((token) => {
    return fetch(`${_apiUrl}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then((res) => { res.ok ? res.json() : res.json().then((e) => Promise.reject(e)) });
  });
};


export const getToken = () => firebase.auth().currentUser.getIdToken();


export const login = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password).then((signInResponse) => _doesUserExist(signInResponse.user.uid))
    .then((doesUserExist) => {
      if (!doesUserExist) {

        logout();

        throw new Error("Something's wrong. The user exists in firebase, but not in the application database. (User may be deactivated)");
      }
    }).catch(err => {
      console.error(err);
      throw err;
    });
};

export const logout = () => { firebase.auth().signOut(); };

export const register = (user, password) => {
  return firebase.auth().createUserWithEmailAndPassword(user.email, password)
    .then((createResponse) => _saveUser({
      ...user,
      firebaseUserId: createResponse.user.uid
    }));
};

export const onLoginStatusChange = (onLoginStatusChangeHandler) => {
  firebase.auth().onAuthStateChanged((user) => {
    onLoginStatusChangeHandler(!!user);
  });
}

export const getAllUserProfiles = () => {
  return getToken().then(token => {
    return fetch(_apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(res => res.json())
  })
};
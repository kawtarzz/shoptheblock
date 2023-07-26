import { getToken } from "./authManager"

const _apiUrl = "/api/category"

// The pagination implementation is not required to use this function. If not included, it will still return the following DTO:
/* 
    {
        categories: [{category}, {category}],
        total: int?
    }
*/
// usePagination (false) = fetch ALL categories at once
// usePagination (true) = fetch ALL categories, 10 at a time, with the defined offset
export const getAllCategories = () => {
  return getToken().then(token => {
    // The query parameters are only added if an argument is provided for them
    return fetch(`${_apiUrl}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => res.json())
  })
}

export const addCategory = (categoryName) => {
  return getToken().then(token => {
    return fetch(_apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: categoryName })
    })
  })
}

export const deleteCategory = (categoryId) => {
  return getToken().then(token => {
    return fetch(`${_apiUrl}/${categoryId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  })
}

//! Don't technically need ID here, since categoryName has a unique constraint
export const editCategory = (oldName, catName) => {
  return getToken().then(token => {
    return fetch(`${_apiUrl}?oldName=${oldName}&newName=${catName}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
  })
}
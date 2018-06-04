import Axios from 'axios'

export function authenticateUser (token) {
  return Axios.post(`${process.env.USER_ENDPOINT}/token/verify`, {}, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(response => response.data)
}

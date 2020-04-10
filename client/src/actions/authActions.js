import { SET_CURRENT_USER, GET_ERRORS } from './types'
import axios from 'axios' 
import setAuthToken from '../utils/setAuthToken'
import jwt_decode from 'jwt-decode'

//Register User
export const registerUser = (userData, brwsrHistory) => 
  dispatch => {
     axios
       .post('api/users/register', userData)
       .then(res => brwsrHistory.push('/login'))
       .catch(err => dispatch({
         type: GET_ERRORS,
         payload: err.response.data
       })
      )
  }

//Login - get user token
export const loginUser = (userData) =>
dispatch => {
  axios
    .post('api/users/login', userData)
    .then(res => {
      const {token} = res.data
      //save token to local storage - means browser storage - more like a browser session
      //attach token to axios header
      setAuthToken(token)

      //decode the token
      const decoded = jwt_decode(token)

      //dispatch set_current_user
      dispatch({
        type: SET_CURRENT_USER,
        payload: decoded
      })
    })
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
}
//we can write as many actions as we want and they can be accessed by different UI components
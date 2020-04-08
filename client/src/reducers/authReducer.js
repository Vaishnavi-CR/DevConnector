import {SET_CURRENT_USER} from '../actions/types'
const initialState = {
  isAuthenticated: false,
  user: {}
}

export default function(state = initialState, action) {
  switch(action.type) {
    
    case SET_CURRENT_USER: 
      return {
        ...state,
        user: action.payload
      }
    default: 
      return state
  }
}

//Reducers determine what and how the data is written into the store
//isAuthenticated to keep track across the board if the user logged in or not
//if the user is authenticated, who is the user.. this information really helps to keep track of
//the user among all components
//reducer is a function that returns the data which is written into the store
//return statement inside a reducer means it is writing the data to the redux store
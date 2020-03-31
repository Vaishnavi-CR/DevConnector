const initialState = {
  isAuthenticated: false,
  user: {}
}

export default function(state = initialState, action) {
  switch(action.type) {
    default: 
      return state
  }
}

//Reducers determine what and how the data is written into the store
//isAuthenticated to keep track across the board if the user logged in or not
//if the user is authenticated, who is the user.. this information really helps to keep track of
//the user among all components
//reducer is a function that returns the data which is written into the store
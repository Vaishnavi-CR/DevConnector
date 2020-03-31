import {createStore, applyMiddleware, compose} from 'redux'
import rootReducer from './reducers'
import thunk from 'redux-thunk'


const middleware = [thunk]
const store = createStore(
  rootReducer,
  {},
  compose(applyMiddleware(...middleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
  
)
export default store

//createstore function takes 3 parameters. reducers is a mandatory parameter. reducers can be 
//an array of reducers. in our code, we are starting with zero number of reducers as we dont 
//what and how many reducers we need at this moment.
//the second parameter is  initial state, we are beginning with empty object as we dont know yet
//the last parameter is enhancement, default enhancement we are gonna apply is thunking.
//thunking will cut the data into bits and pieces and then writes to the store - that way
//performance is increased
// ... 3 dots is the spread operator - it creates a copy of your array and does modification on //top of it
//...middleware means spread the original middleware and then thunk it

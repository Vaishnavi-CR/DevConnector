import React from 'react';
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Footer from './components/layout/Footer'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import store from './store'
import { Component } from 'react';
import setAuthToken from './utils/setAuthToken';
import { SET_CURRENT_USER } from './actions/types';
import jwt_decode from 'jwt-decode'
import { logoutUser } from './actions/authActions';

if(localStorage.jwtToken) {

  //decode
  const decoded = jwt_decode(localStorage.jwtToken)

  //check for expired token
  const currentTime = Date.now()/1000
  if(decoded.exp < currentTime){
    //Logout user
    store.dispatch(logoutUser())
    //redirect to login page
    window.location.href = '/login'
  }

  //set Auth header
  setAuthToken(localStorage.jwtToken)
  
  //dispatch call
  store.dispatch( {
    type: SET_CURRENT_USER,
    payload: decoded
  })


}
class App extends Component {

  render() {
    return (
    
      <Provider store={store}>
      <Router>
        <div className="App">
        <Navbar></Navbar>
        <Route exact path="/" component={Landing} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Footer></Footer>
        </div>
      </Router>
      </Provider>
  
  );
  }
}

export default App;

//code at line 14 is basically to re-direct the user to dashboard when they previously logged
//in and closed the browser and the token is still active in the local storage
//user need not go through the login again as the token is still active
//app.js already has access to the store so there is no need to connect or trigger the dispatch
//call etc
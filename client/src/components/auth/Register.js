import React, { Component } from 'react'
import axios from 'axios'
import classnames from 'classnames'
import {connect} from 'react-redux'
import {registerUser} from '../../actions/authActions'


class Register extends Component {

  constructor() {

    super() //first construct the parent class which in our case is Component class - 
    //Register class is inherited from the Component class
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  //e is the the control from which onChange is calling upon. e gives the names of the control as well as value of the control
  //here name is the name of the contol e not the state variable name
  onSubmit(e) {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    }
    // axios.post('api/users/register', newUser)
    //   .then(res => console.log(res.data))
    //   .catch(err => this.setState({ errors: err.response.data }))

    //firing the action
    this.props.registerUser(newUser)
  }

  render() {
    //const errors = this.state.errors javascript deconstruction syntax
    const {errors} = this.state
    const { user } = this.props.auth
    return (
      <div className="register">
        {user ? user.name : null}
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your DevConnector account</p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input type="text" 
                    className={classnames("form-control form-control-lg", {'is-invalid': errors.name})} 
                    placeholder="Name" name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                  />
                  {errors.name && (
                    <div className="invalid-feedback">{errors.name}</div>
                  )}
                </div>
                <div className="form-group">
                  <input type="email" 
                    className={classnames("form-control form-control-lg", {'is-invalid': errors.email})}  
                    placeholder="Email Address" name="email"
                    value={this.state.email}
                    onChange={this.onChange} 
                  />
                  <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>
                <div className="form-group">
                  <input type="password" 
                    className={classnames("form-control form-control-lg", {'is-invalid': errors.password})}  
                    placeholder="Password" name="password"
                    value={this.state.password}
                    onChange={this.onChange} 
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>
                <div className="form-group">
                  <input type="password" 
                    className={classnames("form-control form-control-lg", {'is-invalid': errors.password2})}  
                    placeholder="Confirm Password" name="password2"
                    value={this.state.password2}
                    onChange={this.onChange} 
                  />
                  {errors.password2 && (
                    <div className="invalid-feedback">{errors.password2}</div>
                  )}
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({auth: state.auth})
//state is the data in the redux store-we are assigning the auth of props to 
//auth of redux state

export default connect(mapStateToProps, {registerUser})(Register)
//connect - connects the UI with redux store and the action - it takes 2 parameters 
//first says the redux store and second is the action
//props is the property value of the parent class (Component) in React
//when a component(Register component in our case) is connected to Redux store via connect, the //action gets automatically added to Component props
//data that we add to the redux store and data that get back from redux store - it is through 
//the props
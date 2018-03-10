import React, { Component } from 'react'
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { setActiveUser } from '../store';

import Cookies from 'js-cookie';

import { post, get } from "../apiMethods";

class Login extends Component {
  constructor(props){
    super(props);
    this.state={
      email: "",
      password: "",
      loading: false,
      msg: undefined
    }
  }
  inputChange = (input) => 
    this.setState({
      [input.target.name]: input.target.value 
    })
  
  loadUser = (event) => {
    event.preventDefault();
    this.setState({
      loading: true
    })
    post("/auth/login", {
      email: this.state.email,
      password: this.state.password
    })
    .then(res=>{
      Cookies.set('token', res.token);
      get("/auth/me").then(user=>
        {
          console.log("Everything okay, the user is: ",user)
          this.props.setActiveUser(user);
          this.setState({
            loading: false
          })
        }
      ).catch(err=>
        console.log("Couldnt log in ", err)
      )
    }).catch(err=>{
      this.setState({
        loading: false,
        msg: JSON.stringify(err)
      });
    }
    )
  }

  logOff = () => {
    this.props.setActiveUser(null);
    Cookies.remove('token');
  }

  render() {
    return (
      <div>
        {this.state.loading ? "loading" : ""}
        <h1>Login here</h1>
        <form onSubmit={this.loadUser}>
          <input placeholder="email" name="email" onChange={this.inputChange}/>
          <input pr="password" name="password" onChange={this.inputChange}/>
          <button type="submit">Log In</button>
          {this.props.user && <button onClick={this.logOff}>Unlog {this.props.user.name}</button>}
        </form>
        {this.state.msg && this.state.msg}
      </div>
    ) 
  }
}

const mapStateToProps = ({user}) => ({user})

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveUser: bindActionCreators(setActiveUser, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
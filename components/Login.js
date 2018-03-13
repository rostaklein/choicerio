import React, { Component } from 'react'
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { setActiveUser } from '../store/actions';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

import Cookies from 'js-cookie';

import { post, get } from "../apiMethods";

import Loading from "./Loading"

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
          //console.log("Everything okay, the user is: ",user)
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

  responseFacebook = (response) => {
    post("/auth/fb", response).then(res=>{
      Cookies.set('token', res.token);
      get("/auth/me").then(user=>
        {
          //console.log("Everything okay, logged by facebook, the user is: ", user)
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
    })
    //console.log("response: ", response);
  }

  render() {
    return (
      <div style={{position: "relative"}}>
        <Loading active={this.state.loading} dimmed />
        <h1>Login here</h1>
          {this.props.user ?
            <button onClick={this.logOff}>Unlog {this.props.user.name}</button>
            :
            <div>
              <form onSubmit={this.loadUser} style={{display: "inline-block"}}>
                <input placeholder="email" name="email" onChange={this.inputChange}/>
                <input pr="password" name="password" onChange={this.inputChange}/>
                <button type="submit">Log In</button>
              </form>
              <FacebookLogin
              appId="191801201422195"
              fields="email"
              callback={this.responseFacebook}
              render={renderProps => (
                <button onClick={renderProps.onClick}>Login using Facebook</button>
              )}
              onClick={()=>this.setState({loading: true})}
              />
            </div>
          }
        
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
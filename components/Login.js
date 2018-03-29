import React, { Component } from 'react'
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { setActiveUser, setActiveModal } from '../store/actions'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

import Cookies from 'js-cookie';

import { post, get } from "../apiMethods";

import Loading from "./Loading"

const registerFields = [
  {
    placeholder: "First and Last name",
    name: "name",
    type: "text",
    icon: "person",
    match: /^[\S]{2,}(\s[\S]{2,})/,
    error: "Please enter valid first and last name."
  },{
    placeholder: "Email address",
    name: "email",
    type: "text",
    icon: "envelope",
    match: /^.+@.+[.].+$/,
    error: "Please enter valid email address."
  },{
    placeholder: "Password",
    name: "password",
    type: "password",
    icon: "lock",
    match: /^.{6,}/,
    error: "Mininimum length is 6 characters."
  },{
    placeholder: "Repeat password",
    name: "password2",
    type: "password",
    icon: "lock",
    error: "Passwords does not match."
  }
];

class Login extends Component {
  constructor(props){
    super(props);
    this.state={
      email: "",
      password: "",
      loading: false,
      fbloading: false,
      regloading: false,
      tab: "Log In",
      msg: null,
      formError: {
        name: true,
        email: true,
        password: true,
        password2: true
      }
    }
  }

  inputChange = (input) => {
    const
      inputName=input.target.name,
      inputValue=input.target.value,
      errorText=registerFields.find(field=>field.name===inputName).error;

    this.setState({
      [inputName]: inputValue
    });
    if(this.state.tab==="Register"){
        let error=false;
        if(inputName==="password2"){
          if(this.state.password!==inputValue){
            error = errorText;
          }
        }else if(!registerFields.find(field=>field.name===inputName).match.test(inputValue)){
          error = errorText;
        }
        this.setState(prev=>({
          formError: {
            ...prev.formError,
            [inputName]: error
          }
        }));
        setTimeout(()=>{
          console.log(Object.keys(this.state.formError).map(key=>this.state.formError[key]));
          const allValid = !Object.keys(this.state.formError).map(key=>this.state.formError[key]).some(val=>val);
          this.setState({
            regValid: allValid
          })
        },500)
    }
  }

  loginSucc = res => {
    Cookies.set('token', res.token);
    get("/auth/me").then(user=>
      {
        //console.log("Everything okay, the user is: ",user)
        this.props.setActiveUser(user);
        (this.props.modal && this.props.modal.afterSucc) && this.props.modal.afterSucc();
        this.props.setActiveModal(null);
        this.setState({
          loading: false
        })
      }
    )
  }
  
  loginErr = res => {
      this.setState({
        loading: false,
        msg: res.msg
      });
  }

  loadUser = event => {
    event.preventDefault();
    this.setState({
      loading: true
    })
    post("/auth/login", {
      email: this.state.email,
      password: this.state.password
    })
    .then(this.loginSucc)
    .catch(this.loginErr)
  }

  register = event => {
    event.preventDefault();
    if(this.state.regValid){
      this.setState({
        loading: true
      })
      post("/auth/register", {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      })
      .then(this.loginSucc)
      .catch(this.loginErr)
    }else{
      console.log("errors present");
    };
    
  }

  responseFacebook = (response) => {
    post("/auth/fb", response).then(res=>{
      Cookies.set('token', res.token);
      get("/auth/me").then(user=>
        {
          //console.log("Everything okay, logged by facebook, the user is: ", user)
          this.props.setActiveUser(user);
          this.props.setActiveModal(null);
          this.setState({
            fbloading: false
          })
        }
      ).catch(this.loginErr)
    }).catch(this.loginErr)
    //console.log("response: ", response);
  }

  render() {
    return (
      <div style={{position: "relative"}}>
        <ul className="switch-nav">
          {["Log In", "Register"].map(option=>
            <li className={this.state.tab===option ? "active" : ""} key={option} onClick={()=>this.setState({tab: option})}>{option}</li>
          )}
        </ul>
        <div className="modal-form">
          {this.state.tab==="Log In" ?
            <div>
              <FacebookLogin
              appId="191801201422195"
              fields="email"
              callback={this.responseFacebook}
              render={renderProps => (
                <button onClick={renderProps.onClick} className="btn full big hasicon fb">
                  <Loading active={this.state.fbloading} inverted/>
                  <span className="icon icon-fb" />
                  <span className="text nochevron">Log in using Facebook</span>
                </button>
              )}
              onClick={()=>this.setState({fbloading: true})}
              />
              <div className="form-separator">
                <span>or</span>
              </div>
              <form onSubmit={this.loadUser}>
                <div className="form-control has-icon">
                  <span className="icon icon-envelope" />
                  <input placeholder="Email Address" name="email" type="text" onChange={this.inputChange}/>
                </div>
                <div className="form-control has-icon">
                  <span className="icon icon-lock" />
                  <input placeholder="Password" name="password" type="password" onChange={this.inputChange}/>
                </div>
                <button type="submit" className="btn full primary">
                  <Loading active={this.state.loading} inverted/>
                  <span className="text">Log in</span>
                </button>
              </form>
            </div>
            :
            <div>
              <form onSubmit={this.register}>
                {registerFields.map((input, i) =>
                    <div className={"form-control has-icon "+ (this.state[input.name] && (this.state.formError[input.name] ? "has-error" : "has-success"))} key={input.name}>
                      <span className={`icon icon-${input.icon}`} />
                      <input key={input+i} placeholder={input.placeholder} name={input.name} type={input.type} onChange={(e)=>this.inputChange(e, input.match)}/>
                      {(this.state[input.name] && this.state.formError[input.name]) && 
                        <div className="error">
                          <span>!</span> {this.state.formError[input.name]}
                        </div>
                      }
                    </div>
                  )
                }
                <button type="submit" className={"btn full primary" + (this.state.regValid ? "" : " disabled")}>
                  <Loading active={this.state.loading} inverted/>
                  <span className="text">Register</span>
                </button>
              </form>
            </div>
          }
          {this.state.msg &&
            <div className="message error centered">
               {this.state.msg}
            </div>
          }
        </div>
      </div>
    ) 
  }
}

const mapStateToProps = ({user, modal}) => ({user, modal})

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveUser: bindActionCreators(setActiveUser, dispatch),
    setActiveModal: bindActionCreators(setActiveModal, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
import React, { Component } from 'react'
import Router from 'next/router'
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import { logOut, setActiveModal } from '../store/actions'
import Login from "./Login"
import Modal from "./Modal"
import RespondingHeader from "./Responding/Header";

class Header extends Component {
  constructor(props){
    super(props);
    this.state = {
      menuIsOpened: false
    }
  }
  openMenuHandler = () => {
    this.setState({
      menuIsOpened: !this.state.menuIsOpened
    })
  }
  render () {
    const props = this.props;
    return (
      props.url.query.action!="s" ?
        <header>
          <div className="left"></div>
          <div className="center">
            <div className="page-title">
              {props.pageTitle.length>0 && props.pageTitle}
            </div>
          </div>
          <div className="right">
            {props.user ?
              <div className="user-menu">
                <div className="user">
                  <span className="icon icon-person" /> {props.user.name}
                </div>
                {this.state.menuIsOpened &&
                    <ul className="dropdown-menu" onClick={this.openMenuHandler}>
                      {/* <li><span className="icon icon-question"></span> My Forms</li>
                      <li><span className="icon icon-person"></span> Profile</li> */}
                      <li onClick={()=>Router.push("/new")}><span className="icon icon-plus"></span> New Form</li>
                      <li onClick={()=>Router.push("/myforms")}><span className="icon icon-questions" style={{fontSize: 10}}></span> My Forms</li>
                      <li onClick={()=>this.props.logOut()}><span className="icon icon-exit"></span> Log Out</li>
                    </ul>
                }
                <div className={"burger-menu " +(this.state.menuIsOpened ? "active" : "")} onClick={this.openMenuHandler}><span></span><span></span><span></span></div>
              </div>
              :
              <div className="user-profile" onClick={()=>this.props.setActiveModal({name: "login"})}>
                <span className="icon icon-person" /> Log In
              </div>

            }
          </div>
          <Modal show={props.modal} onClose={()=>props.setActiveModal(null)}>
            <Login afterSucc={props.modal && (() =>props.modal.afterSucc())} />
          </Modal> 
        </header>
        :
        <RespondingHeader {...props}/>
    )
  }
};

const mapStateToProps = ({ form, user, modal, pageTitle, responding }) => ({ form, user, modal, pageTitle, responding })

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: bindActionCreators(logOut, dispatch),
    setActiveModal: bindActionCreators(setActiveModal, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
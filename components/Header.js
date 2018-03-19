import Link from 'next/link'
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { logOut, setActiveModal } from '../store/actions'
import Login from "./Login"
import Modal from "./Modal"
import React, { Component } from 'react'

// const
//   menuItems=[
//     {
//       name: "Home",
//       link: "/"
//     },
//     {
//       name: "About",
//       link: "/about"
//     }
//   ];    
// {/* <ul className="menu">
//   {
//     menuItems.map(item =>
//       <li key={item.name}>
//         <Link href={item.link}>
//           <a>{item.name}</a>
//         </Link>
//       </li>
//     )
//   }
// </ul> */}

class Header extends Component {
  constructor(props){
    super(props);
    this.state = {
      profileDetailOpen: false
    }
  }
  render () {
    const props = this.props;
    return (
        <header>
          <div className="left"></div>
          <div className="center">
            <div className="page-title">
              {props.pageTitle && props.pageTitle}
            </div>
          </div>
          <div className="right">
            {props.user ?
              <div className="user-profile" onClick={()=>this.setState({profileDetailOpen: !this.state.profileDetailOpen})}>
                <span className="icon icon-person" /> {props.user.name}
                {this.state.profileDetailOpen &&
                    <ul className="dropdown-menu">
                      {/* <li><span className="icon icon-question"></span> My Forms</li>
                      <li><span className="icon icon-person"></span> Profile</li> */}
                      <li onClick={()=>this.props.logOut()}><span className="icon icon-exit"></span> Log Out</li>
                    </ul>
                }
              </div>
              :
              <div className="user-profile" onClick={()=>this.props.setActiveModal({title: "Log in"})}>
                <span className="icon icon-person" /> Log In
              </div>

            }
          </div>
          <Modal>
            <Login />
          </Modal>
        </header>
    )
  }
};

const mapStateToProps = ({ pageTitle, user }) => ({ pageTitle, user })

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: bindActionCreators(logOut, dispatch),
    setActiveModal: bindActionCreators(setActiveModal, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
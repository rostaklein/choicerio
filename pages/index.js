import Layout from '../components/Layout'
import Router from 'next/router'
import Login from "../components/Login"
import AddCount from '../components/AddCount'
import Page from "../components/Page"

import stylesheet from 'styles/welcome-page.scss'

import { connect } from 'react-redux'
import { bindActionCreators } from "redux"
import { setActiveUser, setActiveModal } from '../store/actions'

const
  redirectTo = () => Router.push("/newform"),
  Index = (props) => (
      <div className="centered-layout welcome-page">
        <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
        <img src="/static/img/choicerio_logo.svg" alt="Choicerio Logo" className="welcome-logo"/>
        <h1>Let people align their choices.</h1>
        <h2>Make your own vote advice form!</h2>
        <ol>
          <li>Set up the questions</li>
          <li>Get responses from candidates</li>
          <li>Let people align who do they side with</li>
        </ol>
        <button type="submit" className="btn primary" onClick={props.user ? () => redirectTo() : () => props.setActiveModal({name: "login", afterSucc: redirectTo})}>
          <span className="text">Create vote advice form</span>
        </button>
      </div>
  ),
  mapStateToProps = ({ user }) => {
    return ({
      user: user
    })
  },
  mapDispatchToProps = (dispatch) => {
    return {
      setActiveModal: bindActionCreators(setActiveModal, dispatch)
    }
  }

export default Page(connect(mapStateToProps, mapDispatchToProps)(Index), false)
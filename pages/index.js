import Layout from '../components/Layout'
import Link from 'next/link'
import Login from "../components/Login"
import AddCount from '../components/AddCount'
import Page from "../components/Page"

import stylesheet from 'styles/welcome-page.scss'

const
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
        <button type="submit" className="btn primary">
          <span className="text">Create vote advice form</span>
        </button>
      </div>
  )

export default Page(Index)
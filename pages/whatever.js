import Layout from '../components/Layout'
import Link from 'next/link'
import Login from "../components/Login"
import AddCount from '../components/AddCount'

import Page from "../components/Page"

const
  Index = (props) => (
      <div>
        <h1>All users</h1>
        <small>Total users: {props.users.length}</small>
        <ol>
          {props.users.map((user, i) => (
            <li key={i}>
                {user.name} ({user.email}) <small>- <i className="icon-times" /></small>
            </li>
          ))}
        </ol>
        <AddCount />
      </div>
  )

export default Page(Index)
import Link from 'next/link'
import { connect } from "react-redux"
import Login from "./Login";

const
  menuItems=[
    {
      name: "Home",
      link: "/"
    },
    {
      name: "About",
      link: "/about"
    }
  ],
  Header = (props) => (
    <nav>
      <ul className="menu">
        {
          menuItems.map(item =>
            <li key={item.name}>
              <Link href={item.link}>
                <a>{item.name}</a>
              </Link>
            </li>
          )
        }
      </ul>
      {props.pageTitle}
    </nav>
),
mapStateToProps = ({ pageTitle, user }) => ({ pageTitle, user })


export default connect(mapStateToProps)(Header)
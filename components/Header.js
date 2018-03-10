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
          menuItems.map((item, i)=>
            <Link href={item.link} key={i}>
              <li>{item.name}</li>
            </Link>
          )
        }
      </ul>
      {props.pageTitle}
    </nav>
),
mapStateToProps = ({ pageTitle, user }) => ({ pageTitle, user })


export default connect(mapStateToProps)(Header)
import Head from 'next/head'
import { connect } from "react-redux"

const PageHead = (props) =>
		<Head>
			<title>{props.title ? props.title + " | choicer.io" : "choicer.io - vote advice form generator"}</title>
			<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			<link rel="icon" type="image/png" href="/static/img/favicon.png" />
			<link rel="stylesheet" href="/static/fonts/fonticons.css" />
		</Head>,
	mapStateToProps = ({ title }) => ({ title })
export default connect(mapStateToProps)(PageHead);
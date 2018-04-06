import Head from 'next/head'
import { connect } from "react-redux"

const PageHead = (props) =>
		<Head>
			<title>
			{
				props.form.name.length>0
				?
				props.form.name + " | choicer.io"
				:
				(
					props.pageTitle ?
					props.pageTitle + " | choicer.io"
					:
					"choicer.io - vote advice form generator"
				)
			}
			</title>
			<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			<link rel="icon" type="image/png" href="/static/img/favicon.png" />
			<link rel="stylesheet" href="/static/fonts/fonticons.css" />
			<script src="https://cdn.polyfill.io/v2/polyfill.min.js"></script>
		</Head>,
	mapStateToProps = ({ form, url, pageTitle }) => ({ form, url, pageTitle })
export default connect(mapStateToProps)(PageHead);
import Head from 'next/head'
import { connect } from "react-redux"

const PageHead = (props) =>
		<Head>
			<title>
			{
				(props.url.query.action=="s" && props.form.name.length>0)
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
			{props.form.name.length>0 &&
				[
					<meta key="title" property="og:title" content={props.form.name} />,
					<meta key="desc" property="og:description" content={props.form.description} />,
					<meta key="img" property="og:image" content="http://choicerio.herokuapp.com/static/img/choicerio_welcome.jpg" />
				]
				
			}
			<link rel="icon" type="image/png" href="/static/img/favicon.png" />
			<link rel="stylesheet" href="/static/fonts/fonticons.css" />
			<script src="https://cdn.polyfill.io/v2/polyfill.min.js"></script>
		</Head>,
	mapStateToProps = ({ form, pageTitle }) => ({ form, pageTitle })
export default connect(mapStateToProps)(PageHead);
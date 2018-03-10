import Head from 'next/head'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

const PageHead = (props) =>
  <div>
    <Head>
      <title>Wow, a {props.pageTitle} title!</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous" />
    </Head>
  </div>

const mapStateToProps = ({ pageTitle }) => ({ pageTitle })
  
export default connect(mapStateToProps)(PageHead)
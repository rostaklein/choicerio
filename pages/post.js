import Layout from '../components/Layout'
import fetch from 'isomorphic-unfetch'

const Post =  (props) => (
    <Layout>
        <small>Showing post:</small>
        <h1>{props.url.query.id}</h1>
    </Layout>
)

export default Post
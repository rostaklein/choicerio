import Head from 'next/head'

const PageHead = (props) =>
  <div>
    <Head>
      <title>choicer.io - vote advice form generator</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="icon" type="image/png" href="/static/img/favicon.png" />
      <link rel="stylesheet" href="/static/fonts/fonticons.css" />
    </Head>
  </div>
  
export default PageHead;
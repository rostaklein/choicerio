import Header from './Header';
import Head from './Head';
import stylesheet from 'styles/index.scss';

const Layout = (props) => (
  <div className="layout">
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
    <Head />
    <Header />
    {props.children}
  </div>
)

export default Layout
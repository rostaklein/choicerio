import Header from './Header';
import Head from './Head';
import Footer from "./Footer";
import stylesheet from 'styles/main.scss';

const Layout = (props) => (
  <div className="layout">
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
      <Head title={props.title}/>
      <Header />
      <main>
        {props.children}
      </main>
      <Footer url={props.url}/>
  </div>
)

export default Layout
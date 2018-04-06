import stylesheet from 'styles/footer.scss';
import Router from 'next/router'

const Footer = (props) => (
  <footer>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
    {props.url.pathname!=="/" &&
        <div className="image">
            <img onClick={()=>Router.push("/")} className="footer-logo" src="/static/img/choicerio_logo.svg" alt="Choicerio logo - vote advice form generator app" />
        </div>
    }
    <div className="text">
        Created by Rostislav Klein as a part of bachelors thesis <i>|</i> University of Economics in Prague <i>|</i> 2018 
    </div>
  </footer>
)

export default Footer
const Header = props => 
    <header className="questions">
        <div className="progress-bar">
            <div className="filling" style={{width: ((props.url.query.stepnumber-1)/props.form.questions.length)*100+"%"}}></div>
        </div>
        <div className="left"></div>
        <div className="center">{props.form.name}</div>
        <div className="right"><span className="icon icon-question"></span>&nbsp;{props.url.query.stepnumber}/{props.form.questions.length}</div>
    </header>;

export default Header;
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { logOut } from '../store/actions';
import React, { Component } from 'react';
import stylesheet from 'styles/responding.scss';

const steps = ["start", "responding", "results"];

class FormResponding extends Component {
  constructor(props){
    super(props);
    this.state = {
      step: steps[0]
    }
  }
  render () {
    return (
        <article className="form-responding">
          <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
          <div className="group-top">
            <h1>{this.props.form.name}</h1>
            {this.props.form.description.length>0 &&
              <h2>{this.props.form.description}</h2>
            }
          </div>
          <ul className="info">
            {
              ["questions", "candidates"].map(cat => 
                <li key={cat}>
                  <span className={"icon icon-"+cat}></span>
                  <label>{this.props.form[cat].length} {cat}</label>
                </li>
              )
            }
          </ul>
          <div className="group-bot">
            <button className="btn primary">
              <span className="text">Start now</span>
            </button>
            <div className="who-is">Who is the best choice for you?</div>
          </div>
        </article>
    )
  }
};

const mapStateToProps = ({ form, user}) => ({ form, user})

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: bindActionCreators(logOut, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormResponding)
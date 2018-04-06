import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { logOut } from '../store/actions';
import React, { Component } from 'react';
import { Link } from '../routes'
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
    let
      query = this.props.query,
      step = parseInt(query.stepnumber),
      questions = this.props.form.questions;
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
            {/* <Link route={"/q/"+this.props.query.id+"/s/"+(this.props.query.stepnumber+1 || 1)}> */}
            <Link route={"/q/"+query.id+"/s/1"}>
              <button className="btn primary">
                <span className="text">Start now</span>
              </button>
            </Link>
            <div className="who-is">Who is the best choice for you?</div>
          </div>
          { (query.action=="s" && step) &&
            <div>
              {step>1 &&
                <Link route={"/q/"+query.id+"/s/" + (step-1)}>
                  <button className="btn primary">
                    prev
                  </button>
                </Link>
              }
              {step<questions.length &&
                <Link route={"/q/"+query.id+"/s/" + (step+1)}>
                  <button className="btn primary">
                    next
                  </button>
                </Link>
              }
              {JSON.stringify(questions[step-1])}
            </div>
            }
            
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
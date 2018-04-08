import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setCurrentRespondingStep, setPageTitle } from '../../store/actions';
import React, { Component } from 'react';
import { Link } from '../../routes'

import Welcome from "./Welcome";
import Questions from "./Questions";

export class Responding extends Component {
  constructor(props){
    super(props);
  }
  render(){
    let
      step = parseInt(this.props.query.stepnumber);
      return(
        (this.props.query.action=="s" && step<=this.props.form.questions.length) ?
        <Questions {...this.props} step={step}/>
        :
        <Welcome {...this.props}/>
      );
  }

}

const mapStateToProps = ({ form, responding}) => ({ form, responding})

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentRespondingStep: bindActionCreators(setCurrentRespondingStep, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Responding)
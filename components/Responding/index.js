import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setPageTitle, addAnswer } from '../../store/actions';
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

const mapStateToProps = ({ form, answers}) => ({ form, answers})

const mapDispatchToProps = (dispatch) => {
  return {
    addAnswer: bindActionCreators(addAnswer, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Responding)
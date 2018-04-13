import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setAnsweringCandidate, addAnswer } from '../../store/actions';
import React, { Component } from 'react';
import { Link } from '../../routes'

import Welcome from "./Welcome";
import Questions from "./Questions";
import Results from "./Results";

export class Responding extends Component {
  constructor(props){
    super(props);
  }
  componentWillMount(){
    if(this.props.query.action=="candidate"){
      this.props.setAnsweringCandidate(this.props.query.stepnumber);
    }
  }
  componentWillUnmount(){
    this.props.setAnsweringCandidate(null);
  }
  render(){
    let
      step = parseInt(this.props.query.stepnumber);
      return(
        (this.props.query.action=="s" && step<=this.props.form.questions.length) ?
        <Questions {...this.props} step={step}/>
        :
        (this.props.query.action=="results" ?
        <Results {...this.props}/>
        :
          <Welcome {...this.props}/>     
        )
        
      );
  }

}

const mapStateToProps = ({ form, answers, candidate}) => ({ form, answers, candidate})

const mapDispatchToProps = (dispatch) => {
  return {
    addAnswer: bindActionCreators(addAnswer, dispatch),
    setAnsweringCandidate: bindActionCreators(setAnsweringCandidate, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Responding)
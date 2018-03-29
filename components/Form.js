import React, { Component } from 'react'
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { editForm } from '../store/actions'


class Form extends Component {
    constructor(props){
      super(props);
      this.state={
        
      }
    }
    inputChange = (input) => {
        this.props.editForm({
            [input.target.name]: input.target.value
        });
    }

    render (){
        return(
            <div>
            <div className="form-control">
                <input type="text" name="name" className="transparent huge" placeholder="Enter form name" onChange={this.inputChange}/>
            </div>
            <div className="form-control">
                <input type="text" name="description" className="transparent medium" placeholder="Enter description" onChange={this.inputChange}/>
            </div>
        
        </div>
        )
    }
        
};

const mapStateToProps = ({ form }) => ({ form });

const mapDispatchToProps = (dispatch) => {
    return {
      editForm: bindActionCreators(editForm, dispatch)
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Form);
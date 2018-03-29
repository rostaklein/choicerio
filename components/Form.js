import React, { Component } from 'react'
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { editForm, setPageTitle } from '../store/actions'
import EditableList from "./EditableList";


class Form extends Component {
    constructor(props){
      super(props);
      this.state={
        ...props.form
      }
    };

    editStateAndRedux = (property, value) => {
        this.setState({
            [property]: value
        })
        this.props.editForm({
            [property]: value
        });
    }

    inputChange = (input) => {
        if(input.target.name=="name"){
            this.props.setPageTitle(input.target.value);
        }
        this.editStateAndRedux(input.target.name, input.target.value);
        
    }

    questionsChange = questions => {
        this.editStateAndRedux(input.target.name, input.target.value);
    }

    render (){
        return(
            <div>
            <div className="form-control">
                <input type="text" name="name" className="transparent huge" placeholder="Enter form name" onChange={this.inputChange} value={this.state.name}/>
            </div>
            <div className="form-control">
                <input type="text" name="description" className="transparent medium" placeholder="Enter description" onChange={this.inputChange} value={this.state.description}/>
            </div>
            <EditableList items={this.state.questions} onItemsChange={(items) => this.editStateAndRedux("questions", items)} />
        </div>
        )
    }
        
};

const mapStateToProps = ({ form }) => ({ form });

const mapDispatchToProps = (dispatch) => {
    return {
      editForm: bindActionCreators(editForm, dispatch),
      setPageTitle: bindActionCreators(setPageTitle, dispatch)
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Form);
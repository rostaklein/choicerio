import React, { Component } from 'react'
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { editForm, setPageTitle } from '../store/actions'
import EditableList from "./EditableList";

const menuItems = ["Questions", "Candidates", "Statistics"];

class Form extends Component {
    constructor(props){
      super(props);
      this.state={
        ...props.form,
        activeTab: menuItems[0]
      }
    };

    editStateAndRedux = (property, value) => {
        this.setState({
            [property]: value
        })
        this.props.editForm({
            [property]: value
        });
        setTimeout(()=>{
            this.checkErrors();
        },0);
       
    }

    inputChange = (input) => {
        if(input.target.name=="name"){
            this.props.setPageTitle(input.target.value);
        }
        this.editStateAndRedux(input.target.name, input.target.value);
        
    }

    onSubmit = () => {
        if(this.state.valid){
            console.log("Is valid, submitting.");
        }else{
            this.checkErrors();
            this.setState({
                triedSubmit: true
            })
        }
    }

    checkErrors = () => {
        let toCheck = ["questions", "candidates"];
        let errors={};
        toCheck.forEach(property => {
            if(this.props.form[property].length<1){
                errors={
                    ...errors,
                    [property]: "You need to enter at least one "+property.substr(0, property.length-1)
                }
            }
        })
        this.setState({
            errors,
            valid: Object.keys(errors).length==0
        });
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
            <ul className="switch-nav huge-icons" style={{marginBottom: 20}}>
                {menuItems.map(item => 
                    <li
                        className={this.state.activeTab===item ? "active" : ""}
                        onClick={()=>this.setState({activeTab: item})}
                        key={item}
                    >
                        <span className={"icon icon-"+item.toLowerCase()} />
                        <div>{item}</div>
                    </li>
                )}
            </ul>
            {this.state.activeTab === "Questions" &&
                <EditableList
                    items={this.state.questions}
                    onItemsChange={(items) => this.editStateAndRedux("questions", items)}
                    itemName="Question"
                />
            }
            {this.state.activeTab === "Candidates" &&
                <EditableList
                    items={this.state.candidates}
                    onItemsChange={(items) => this.editStateAndRedux("candidates", items)}
                    itemName="Candidate"
                />
            }
            <div className="form-buttons">
                {!this.state.valid &&
                    <button type="submit" className={"btn"} onClick={()=>this.setState(
                        {
                            activeTab: this.state.activeTab === "Questions" ? "Candidates" : "Questions"
                        })}>
                        <span className="text">
                            Set up {this.state.activeTab === "Questions" ?
                            "candidates" : "questions"
                            }
                        </span>
                    </button>
                }
                <button type="submit" className={"btn primary "+(this.state.valid ? "" : "disabled")} onClick={this.onSubmit}>
                    <span className="text">Submit &amp; save</span>
                </button>          
            </div>
            {this.state.triedSubmit &&
                <div className="form-errors">
                    {Object.keys(this.state.errors).map(errorKey =>
                        <div className="message error centered">
                            {this.state.errors[errorKey]}
                        </div>
                    )}
                </div>
            }
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
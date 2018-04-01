import React, { Component } from 'react'
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { editForm, setPageTitle } from '../store/actions'
import EditableList from "./EditableList";
import Transition from 'react-addons-css-transition-group'
import { post, get } from "../apiMethods";
import Loading from "./Loading"

const menuItems = ["Questions", "Candidates", "Statistics"];

class Form extends Component {
    constructor(props){
      super(props);
      this.state={
        ...props.form,
        activeTab: menuItems[0],
        loading: {
            submit: false
        },
        submitErrors: []
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
        this.setState({
            triedSubmit: true
        })
        if(this.state.valid){
            console.log("Is valid, submitting.", this.props.form);
            this.setState({loading: {
                ...this.state.loading,
                submit: true
            }});
            post("/form/create", this.props.form).then(res => {
                this.setState({loading: {
                    ...this.state.loading,
                    submit: false
                }});
                console.log(res);
            }).catch(err=>{
                this.setState({loading: {
                    ...this.state.loading,
                    submit: false
                },
                submitErrors: [
                    ...this.state.submitErrors,
                    err.msg
                ]});
                console.log(err.msg);
            });
        }else{
            this.checkErrors();
        }
    }

    checkErrors = () => {
        let toCheck = ["questions", "candidates"];
        let errors={};
        toCheck.forEach(property => {
            if(this.props.form[property].length<2){
                errors={
                    ...errors,
                    [property]: "You need to enter at least two "+property
                }
            }
        });

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
                    <Loading active={this.state.loading.submit} inverted/>
                    <span className="text">Submit &amp; save</span>
                </button>          
                <button type="submit" className={"btn"} onClick={()=>get("/form/my").then(res => console.log(res))}>
                    <span className="text">Check all of my</span>
                </button>          
            </div>
            {this.state.triedSubmit &&
                <div className="form-errors">
                    <Transition
                        transitionName="animate-height"
                        transitionEnterTimeout={800}
                        transitionLeaveTimeout={800}
                    >
                    {Object.keys(this.state.errors).map(errorKey =>
                        <div className="message error centered" key={errorKey}>
                            {this.state.errors[errorKey]}
                        </div>
                    )}
                    {this.state.submitErrors.map(error=>
                        <div className="message error centered" key={error}>
                            {error}
                        </div>
                    )}
                    </Transition>
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
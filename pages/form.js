import Page from "../components/Page"
import { Component } from 'react';
import Loading from "../components/Loading";

import { connect } from 'react-redux'
import { bindActionCreators } from "redux"
import { setFormData } from '../store/actions'
import Form from "../components/Form"
import Responding from "../components/Responding";

class DisplayForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: props.form.name.length==0,
            error: false
        }
    }

    componentWillReceiveProps(){
        this.setState({
            loading: this.props.form.name.length==0
        })
    }

    render(){
        return(
            this.state.loading ?
                <Loading active dimmed/>
                :
                (
                    this.state.error ?
                    <div className="message error centered">{this.state.error.msg}</div>
                    :
                    (
                        this.props.form &&
                        ( (this.props.url.query.action=="edit" && this.props.user) ?
                            (
                                (this.props.user._id===this.props.form.createdBy._id) ?
                                <Form editMode/>
                                :
                                <div className="message error centered"><b>{this.props.user.name}</b>&nbsp;is not permitted to edit&nbsp;<b>{this.props.form.name}</b>.</div>
                            )
                            :
                            <Responding query={this.props.url.query}/>
                        )
                        
                        
                    )
                ) 
        )
    }
};

const mapStateToProps = ({ user, form }) => {
  return ({
    user,
    form
  })
};

const mapDispatchToProps = (dispatch) => {
  return {
    setFormData: bindActionCreators(setFormData, dispatch)
  }
};

export default Page(connect(mapStateToProps, mapDispatchToProps)(DisplayForm))
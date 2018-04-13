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
    }

    render(){
        return(
            this.props.errors.form_not_found ?
            <div className="message error centered">{this.props.errors.form_not_found}</div>
            :
            (this.props.form.name.length==0 ?
                <Loading active dimmed/>
                :
                (this.props.form &&
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

const mapStateToProps = ({ user, form, errors }) => {
  return ({
    user,
    form,
    errors
  })
};

const mapDispatchToProps = (dispatch) => {
  return {
    setFormData: bindActionCreators(setFormData, dispatch)
  }
};

export default Page(connect(mapStateToProps, mapDispatchToProps)(DisplayForm))
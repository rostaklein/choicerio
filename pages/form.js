import Page from "../components/Page"
import { Component } from 'react';
import Loading from "../components/Loading";
import { get } from "../apiMethods";

import { connect } from 'react-redux'
import { bindActionCreators } from "redux"
import { setFormData } from '../store/actions'
import Form from "../components/Form"

class DisplayForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            error: false
        }
    }
    componentDidMount(){
        get("/form/byurl/"+this.props.url.query.id).then(res=>{
            this.props.setFormData(res);
            this.setState({
                loading: false
            })
        }).catch(error=>{
            this.setState({
                loading: false,
                error
            })
        })
    }
    render(){
        return(
            <div>
                {this.state.loading ?
                    <Loading active dimmed/>
                    :
                    (
                        this.state.error ?
                        <div className="message error centered">{this.state.error.msg}</div>
                        :
                        (
                            this.props.form &&
                            ( this.props.url.query.edit ?
                                ((this.props.user._id===this.props.form.createdBy._id) ?
                                <Form />
                                :
                                <div className="message error centered"><b>{this.props.user.name}</b>&nbsp;is not permitted to edit&nbsp;<b>{this.props.form.name}</b>.</div>
                                )
                                :
                                <div>{JSON.stringify(this.props.form)}</div>
                            )
                            
                            
                        )
                    )
                }
            </div>
            
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

export default Page(connect(mapStateToProps, mapDispatchToProps)(DisplayForm), true)
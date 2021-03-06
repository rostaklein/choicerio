import Page from "../components/Page"
import { Link } from '../routes'
import { Component } from 'react';
import Loading from "../components/Loading";
import { get } from "../apiMethods";

import { connect } from 'react-redux'
import { bindActionCreators } from "redux"
import { setFormData } from '../store/actions'
import Form from "../components/Form"
import stylesheet from 'styles/my-forms.scss'

class MyForms extends Component {
    constructor(props){
        super(props);
        this.state = {
            forms: [],
            loading: true,
            error: false
        }
    }
    componentDidMount(){
        get("/form/my/").then(res=>{
            this.setState({
                forms: res,
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
                <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
                {this.state.loading ?
                    <Loading active dimmed/>
                    :
                    (
                        this.state.error ?
                        <div className="message error centered">{this.state.error.msg}</div>
                        :
                        this.state.forms.length>0 ?
                        <div>
                            <ul className="my-forms">
                                {
                                    this.state.forms.map(form=>
                                        <li key={form.url}>
                                            <div className="buttons">
                                                <Link route={"/q/"+form.url+""}><button className="btn hasicon nobg"><span className="icon icon-eye"/><span className="text">View</span></button></Link>
                                                <Link route={"/q/"+form.url+"/edit"}><button className="btn hasicon nobg"><span className="icon icon-pencil"/> Edit</button></Link>
                                            </div>
                                            <div className="info">
                                                <div className="top-part"><h2 className="form-name">{form.name}</h2></div>
                                                <div className="bottom-part">
                                                    <div className="item"><span className="icon icon-questions" />{form.questions.length} questions</div>
                                                    <div className="item"><span className="icon icon-candidates" />{form.candidates.length} candidates</div>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                }
                            </ul>
                        </div>
                        :
                        <div className="huge message info centered">
                                You have no forms created yet.
                        </div>
                    )
                }
            </div>
            
        )
    }
};

const mapStateToProps = ({ user }) => {
  return ({
    user
  })
};

const mapDispatchToProps = (dispatch) => {
  return {
    setFormData: bindActionCreators(setFormData, dispatch)
  }
};

export default Page(connect(mapStateToProps, mapDispatchToProps)(MyForms), true, "My Forms")
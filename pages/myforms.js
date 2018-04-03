import Page from "../components/Page"
import Link from 'next/link'
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
                        <div>
                            <ul className="my-forms">
                                {
                                    this.state.forms.map(form=>
                                        
                                            <Link href={"/q/"+form.url+"/edit"}>
                                                <li>
                                                    <div className="top-part"><h2 className="form-name">{form.name}</h2></div>
                                                    <div className="bottom-part">
                                                        <div className="item"><span className="icon icon-questions" />{form.questions.length} questions</div>
                                                        <div className="item"><span className="icon icon-candidates" />{form.candidates.length} candidates</div>
                                                    </div>
                                                </li>
                                            </Link>
                                    )
                                }
                            </ul>
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
import Router from 'next/router'
import { Component } from "react";
import stylesheet from 'styles/responding/Questions.scss';
import { scale } from "../../constants";

class Questions extends Component {
    constructor(props){
        super(props);
    }
    onClickStep = next => {
        const
            currentQuery = this.props.query,
            formUrl = currentQuery.id,
            currentStep = parseInt(currentQuery.stepnumber),
            query = `/form?id=${formUrl}&action=s&stepnumber=`,
            url   = `/q/${formUrl}/s/`;
        if(next){
            console.log(query+(currentStep+1), url+(currentStep+1));
            if((currentStep+1) > this.props.form.questions.length){
                console.log("Finished the form with:", this.props.answers);
            }else{
                Router.push(query+(currentStep+1), url+(currentStep+1))
            }
            
        }else{
            console.log(query+(currentStep-1), url+(currentStep-1));
            Router.push(query+(currentStep-1), url+(currentStep-1))
        }
    }

    vote = option => {
        const
            step = parseInt(this.props.query.stepnumber),
            question = this.props.form.questions[step-1],
            answer = {question: question._id, option};
            this.props.addAnswer(answer);
            setTimeout(()=>{
                this.onClickStep(true);
            }, 500);
    }

    render(){
        const
            props = this.props,
            step = parseInt(props.query.stepnumber),
            question = props.form.questions[step-1];

        return(
            <div className="questions-content">
                <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
                <div className="question">
                    <div className="detail">
                        <h1>{question.title}</h1>
                        <h2 className="description">{question.description}</h2>
                    </div>
                    <div className="scale">
                        {scale.map((option, i)=>
                            <div key={i} className={"option " +(this.props.answers[question._id]==i ? "active" : "")} onClick={()=>this.vote(i)}>{option}&nbsp;<span className="sub">{i<2 ? "agree" : (i>2 ? "disagree" : "")}</span></div>
                        )}
                    </div>
                </div>
                {step>1 &&
                    <div className="nav-arrow left" onClick={()=>this.onClickStep()}>
                        <span className="icon icon-chevron-left-big" />
                    </div>
                }
                {step<props.form.questions.length &&
                    <div className="nav-arrow right" onClick={()=>this.onClickStep(true)}>
                        <span className="icon icon-chevron-right-big" />
                    </div>
                }
            </div>
        )
    }
}


export default Questions;
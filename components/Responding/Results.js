import stylesheet from 'styles/responding/Results.scss';
import { Link } from '../../routes';
import Router from 'next/router';
import { compare, calculate } from "../../logic/compare";
import { scale } from "../../constants";

const CalcResults = (answers, form) => 
    form.candidates
    .map(candidate => ({
        ...candidate,
        answers: form.candidateSubmissions[candidate._id],
        result: form.candidateSubmissions[candidate._id] ? calculate(answers, form.candidateSubmissions[candidate._id]) : null
    }))
    .sort((a, b) => b.result - a.result);

const Results = (props) => {
    const
        calculated = CalcResults(props.answers, props.form),
        hasResult = calculated.filter(res=>res.result);

    if(props.candidate){
        return <article className="form-results">
        <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
            <h1>Questions answered for {props.form.candidates.find(cand=>cand._id==props.candidate).title}</h1>
            <h3>Your answers are recorded. People can check whether their opinions align with yours.</h3>
        </article>
    }else{
    return <article className="form-results">
                <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
                <h3>When voting about</h3>
                <h1>{props.form.name}</h1>
                {hasResult.length>1 ?
                <ul className="candidates">
                    {hasResult.map(candidate =>
                        <li key={candidate._id}>
                            <div className="result-sub">Your opinions align by:</div>
                            <div className="percent">{candidate.result}%</div>
                            <div className="result-sub">with</div>
                            <h2>{candidate.title}</h2>
                            {/* <div>
                                {props.form.candidateSubmissions[candidate._id] ?
                                <div>
                                    {props.form.questions.map(question=>
                                    <div key={question._id}>
                                        <div>{question.title}</div>
                                        <div>You: {scale[props.answers[question._id]]}, {candidate.title}: {scale[props.form.candidateSubmissions[candidate._id][question._id]]}</div>
                                    </div>
                                    )}
                                    <h1>{calculate(props.answers, props.form.candidateSubmissions[candidate._id])}</h1>
                                </div>
                                    :
                                    <span>This candidate has no answers set yet.</span>
                                }
                            
                            </div> */}
                        </li>)
                    }
                    </ul>
                    :
                    <div className="message info">
                        We cannot decide yet, at least 2 candidates need to respond.
                    </div>
                    }
                    
                
                {
                    calculated.filter(res=>!res.result).length>0 &&
                    <div className="no-values">
                        Out of {calculated.length} candidates {calculated.length-hasResult.length} have no response yet.
                        <ol>
                            {calculated.filter(res=>!res.result).map(candidate=>
                                <li>{candidate.title}</li>
                            )}
                        </ol>
                    </div> 
                }
                
        </article>
    }
}

export default Results;
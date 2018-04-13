import stylesheet from 'styles/responding/Welcome.scss';
import { Link } from '../../routes';
import Router from 'next/router';

const Welcome = (props) => {
    let candidate = props.form.candidates.find(candidate=>candidate._id===props.candidate);

    let disabledCandidate;
    if(props.candidate && !candidate) {
        disabledCandidate=true;
    }

    return (
        <article className="form-responding">
            <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
            <div className="group-top">
                {props.candidate &&
                    <div className="candidate">
                        { disabledCandidate ?
                            <div className="message error">
                            Can't set the response. Invalid candidate.
                            </div>
                            :
                            [
                                <div className="top" key="top">
                                    By responding to this form, you will set the answers for:
                                </div>,
                                <h3 key="title"><span className="icon icon-person"></span>&nbsp;{candidate.title}</h3>,
                                <div className="bot" key="bot">
                                    {candidate.description}
                                </div>
                            ]
                        }
                    </div>    
                }
                <h1>{props.form.name}</h1>
                {props.form.description.length>0 &&
                    <h2>{props.form.description}</h2>
                }
                
                </div>
                <ul className="info">
                {
                    ["questions", "candidates"].map(cat => 
                    <li key={cat}>
                        <span className={"icon icon-"+cat}></span>
                        <label>{props.form[cat].length} {cat}</label>
                    </li>
                    )
                }
                </ul>
            <div className="group-bot">
                <button className={"btn primary "+(disabledCandidate ? "disabled" : "")} onClick={()=>{
                    if(!disabledCandidate) {
                        Router.push(`/form?id=${props.query.id}&action=s&stepnumber=1`, `/q/${props.query.id}/s/1`);
                    }
                }}>
                    <span className="text">Start now</span>
                </button>
                <div className="who-is">Who is the best choice for you?</div>
            </div>
        </article>
    )
    
}


export default Welcome;
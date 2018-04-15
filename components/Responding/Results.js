import stylesheet from 'styles/responding/Welcome.scss';
import { Link } from '../../routes';
import Router from 'next/router';
import { compare } from "../../constants";
const Results = (props) =>
<article className="form-responding">
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
    {props.form.candidates.map(candidate=>
        <div>
            <div className="candidate">{candidate.title}</div>
            <div>
                {props.form.candidateSubmissions[candidate._id] ?
                    JSON.stringify(compare(props.answers, props.form.candidateSubmissions[candidate._id]))
                    :
                    <span>This candidate has no answers set yet.</span>
                }
            
            </div>
        </div>
        
    )}
    {/* {JSON.stringify(compare(props.answers, example))} */}
</article>

export default Results;
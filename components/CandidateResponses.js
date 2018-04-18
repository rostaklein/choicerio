import React from "react";
import { Link } from "../routes";
import stylesheet from 'styles/candidate-responses.scss';

const CandidateResponses = ({ candidates, url }) =>
<div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
    <ul className="candidate-responses">
        {candidates.map(candidate =>
            {
                const link = "/q/"+url+"/candidate/"+candidate._id;
                return <li>
                    <div>
                        <div className="info">Set responses for</div>
                        <h2>{candidate.title}</h2>
                    </div>
                    <div>
                        <div className="link">{window.location.origin+link}</div>
                        <div className="buttons">
                                
                                <a href={window.location.origin+link} target="_blank" className="btn primary">open link</a>
                            </div>
                    </div>
                </li>
            }
        )}
    </ul>
</div>


export default CandidateResponses;
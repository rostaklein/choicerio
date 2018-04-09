import stylesheet from 'styles/responding/Welcome.scss';
import { Link } from '../../routes';
import Router from 'next/router';

const Welcome = (props) =>
<article className="form-responding">
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
    <div className="group-top">
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
        {/* <Link route={"/q/"+props.query.id+"/s/"+(props.query.stepnumber+1 || 1)}> */}
        <button className="btn primary" onClick={()=>{
            console.log("Whatever");
            Router.push(`/form?id=${props.query.id}&action=s&stepnumber=1`, `/q/${props.query.id}/s/1`);
        }}>
            <span className="text">Start now</span>
        </button>
        <div className="who-is">Who is the best choice for you?</div>
    </div>
</article>

export default Welcome;
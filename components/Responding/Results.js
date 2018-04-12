import stylesheet from 'styles/responding/Welcome.scss';
import { Link } from '../../routes';
import Router from 'next/router';
import { compare } from "../../constants";
const example = {
    "5acccd50ea701700048c1f82": 0,
    "5acccd50ea701700048c1f83": 3,
    "5acccd50ea701700048c1f84": 4,
    "5acccd50ea701700048c1f85": 3,
    "5acccd50ea701700048c1f86": 4
  };
const Results = (props) =>
<article className="form-responding">
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
    {JSON.stringify(compare(props.answers, example))}
</article>

export default Results;
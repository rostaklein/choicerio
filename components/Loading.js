import stylesheet from 'styles/loading.scss'

const Loading = (props) =>
(
    props.active ?
    <div className={"loading" + (props.dimmed ? " dimmed" : "") + (props.inverted ? " inverted" : "")}>
        <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
        <div className="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
    :
    null
)
    
export default Loading;
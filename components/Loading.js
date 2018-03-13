import stylesheet from 'styles/loading.scss'

const Loading = (props) =>
(
    props.active &&
    <div className={"loading" + (props.dimmed ? " dimmed" : "")}>
        <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
        <div class="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
)
    
export default Loading;
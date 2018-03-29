import { Component } from 'react';

class EditableList extends Component {
    constructor(props){
        super(props);
        this.state={
            items: props.items
        }
    }
    keyDown = e => {
        if(e.keyCode === 13) {
            console.log("Enter!");
            this.props.onItemsChange(this.state.items);
        }
    }
    inputChange = e => {
        this.setState({
            items: [...this.state.items, e.target.value]
        })
    }
    render() {
        return(
            <div>
                {JSON.stringify(this.props)}
                <div className="form-control">
                    <input type="text" onChange={this.inputChange} onKeyDown={this.keyDown}/>
                </div>
            </div>
        )
    }
}
    

export default EditableList;

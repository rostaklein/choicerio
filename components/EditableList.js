import { Component } from 'react';
import stylesheet from 'styles/editable-list.scss'
import Transition from 'react-addons-css-transition-group'

class EditableList extends Component {
    constructor(props){
        super(props);
        this.state={
            newItem: {
                title: null,
                description: null
            },
            selectedItem: null
        }
    }

    componentDidMount(){
        this.newInput.focus(); 
     }

    keyDown = e => {
        if(e.keyCode === 13) {
            this.addNew();
        }
    }
    newItem = () => {
        console.log("Clicked on new item");
        this.setState({selectedItem: null});
        setTimeout(()=>this.newInput.focus(), 0);
        
        console.log(this.state.selectedItem);
    }

    addNew = () => {
        this.setState({
            newItem: {
                title: null,
                description: null
            }
        })
        this.newInput.value = "";
        this.props.onItemsChange([...this.props.items, {...this.state.newItem, order: this.props.items.length+1}]);
    }

    changeOrder = (item, direction) => {
        let newOrder;
        if(direction==="up"){
            newOrder=item.order-1;
        }else{
            newOrder=item.order+1;
        }
        let replacedItem = this.props.items.find(item=>item.order===newOrder);
        if(replacedItem){
            this.props.onItemsChange([
                ...this.props.items.filter(filtered => ![item.order, replacedItem.order].includes(filtered.order)),
                {
                    ...replacedItem,
                    order: item.order
                },
                {
                    ...item,
                    order: newOrder
                }
            ]);
        }
    }
    deleteItem = item => {
        console.log(item, this.state.selectedItem);
        if(this.state.selectedItem == item){
            console.log("the same")
            this.setState({selectedItem: null});
            console.log(this.state.selectedItem);
        }
        this.props.onItemsChange(
            this.props.items.filter(filtered => filtered!==item)
        )
    }
    editExisting = (e, item) => {
        console.log("editing", item);
        let edited = {
            ...item,
            [e.target.name]: e.target.value
        };
        this.props.onItemsChange([
            ...this.props.items.filter(filtered => filtered!=item),
            edited
        ]);
        this.setState({
            selectedItem: edited
        })
        
    }
    setSelected = item => {
        if(item!=this.state.selectedItem){
            this.setState({selectedItem: item});
            setTimeout(()=>this.editInput.focus(), 0);
        }
    }
    moveCursorToTheEnd = e => {
        let val = e.target.value;
        e.target.value = '';
        e.target.value = val;
    }
    render() {
        return(
                <div>
                    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
                    <ol className="editable-list">
                    <Transition
                        transitionName="animate-height"
                        transitionEnterTimeout={800}
                        transitionLeaveTimeout={800}
                    >
                        {this.props.items.sort((a, b) => {return a.order-b.order}).map((item, i) =>
                            <li
                                key={i}
                                className={this.state.selectedItem === item ? "active" : ""}
                                onClick={()=>this.setSelected(item)}
                            >
                                {
                                    this.state.selectedItem===item ?
                                    <div className="form-control value">
                                        <input
                                            type="text"
                                            placeholder={this.props.itemName}
                                            name="title"
                                            ref={input => this.editInput = input}
                                            value={this.state.selectedItem.title}
                                            onChange={(e) => this.editExisting(e, item)}
                                            onFocus={this.moveCursorToTheEnd}
                                        />
                                    </div>
                                    :
                                    <div className="value">
                                        {item.title ? item.title : <span className="no-value">{this.props.itemName} without title</span>} <span className="desc-preview">{item.description}</span>
                                    </div>
                                }
                                <div className="toolbar">
                                    {
                                        i!==0 &&
                                        <span onClick={()=>this.changeOrder(item, "up")} className="icon arrow icon-arrow-up"></span>
                                    }
                                    {
                                        i!==this.props.items.length-1 &&
                                        <span onClick={()=>this.changeOrder(item, "down")} className="icon arrow icon-arrow-down"></span>
                                    }
                                    <span onClick={()=>this.deleteItem(item)} className="icon icon-times" />
                                </div>
                                {
                                    this.state.selectedItem===item &&
                                    <div className="description">
                                        <div className="form-control value">
                                            <input
                                                type="text"
                                                placeholder={this.props.itemName + " description"} 
                                                name="description"
                                                value={this.state.selectedItem.description}
                                                onChange={(e) => this.editExisting(e, item)}
                                            />
                                        </div>
                                    </div>
                                }
                            </li>
                        )}
                        {
                            !this.state.selectedItem &&
                            <li className="active new">
                                <div className="form-control value">
                                    <input ref={input => this.newInput = input} type="text" placeholder={this.props.itemName} onKeyDown={this.keyDown} onChange={(e) => this.setState({newItem: {...this.state.newItem, title: e.target.value}})}/>
                                </div>
                                <span className="icon icon-plus" onClick={()=>this.addNew()}/>
                            </li>
                        }
                        </Transition>
                    </ol>
                    {this.state.selectedItem &&
                        <div onClick={()=>this.newItem()} className="new-item">
                            <span className="icon icon-plus" /> Add new {this.props.itemName.toLowerCase()}
                        </div>
                    }
                </div>
        )
    }
}
    

export default EditableList;

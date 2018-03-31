import { Component } from 'react';
import stylesheet from 'styles/editable-list.scss'
import Transition from 'react-addons-css-transition-group'

class EditableList extends Component {
    constructor(props){
        super(props);
        this.state={
            newQuestion: {
                title: null,
                description: null
            },
            selectedItem: null
        }
    }
    keyDown = e => {
        if(e.keyCode === 13) {
            this.addNew();
        }
    }

    addNew = () => {
        this.setState({
            newItem: {
                title: null,
                description: null
            }
        })
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
                                onClick={()=>this.setState({selectedItem: item})}
                            >
                                {
                                    this.state.selectedItem===item ?
                                    <div className="form-control value">
                                        <input
                                            type="text"
                                            placeholder="Question"
                                            name="title"
                                            value={this.state.selectedItem.title}
                                            onChange={(e) => this.editExisting(e, item)}
                                        />
                                    </div>
                                    :
                                    <div className="value">
                                        {item.title ? item.title : <span className="no-value">Question without title</span>}
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
                                                placeholder="Question detail"
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
                                    <input type="text" placeholder="Question" onKeyDown={this.keyDown} onChange={(e) => this.setState({newItem: {...this.state.newQuestion, title: e.target.value}})}/>
                                </div>
                                <span className="icon icon-plus" onClick={()=>this.addNew()}/>
                            </li>
                        }
                        </Transition>
                    </ol>
                    {this.state.selectedItem &&
                        <div onClick={()=>this.setState({selectedItem: null})} className="new-item">
                            <span className="icon icon-plus" /> Add new question
                        </div>
                    }
                </div>
        )
    }
}
    

export default EditableList;

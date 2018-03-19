import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addCount, setCount, setNumberAsTitle, setActiveModal } from '../store/actions'
import Loading from "./Loading";

class AddCount extends Component {
  add = () => {
    this.props.addCount()
  }

  setTo = (count) => {
    this.props.setCount(parseInt(count) || 0)
  }

  loaderCosi = () => <Loading />

  render () {
    const { count } = this.props
    return (
      <div>
        <style jsx>{`
          div {
            padding: 0 0 20px 0;
          }
      `}</style>
        <h1>AddCount: <span>{count}</span></h1>
        <button onClick={this.add}>Add To Count</button>
        <input onChange={(i)=>this.setTo(i.target.value)} value={count}/>
        <button onClick={()=>this.props.setNumberAsTitle()}>Set "{count}" number as title</button>
      </div>
    )
  }
}

const mapStateToProps = ({ count }, ownProps) => {
  return ({
    count: count
  })
}

const mapDispatchToProps = (dispatch) => {
  return {
    addCount: bindActionCreators(addCount, dispatch),
    setCount: bindActionCreators(setCount, dispatch),
    setNumberAsTitle: bindActionCreators(setNumberAsTitle, dispatch),
    setActiveModal: bindActionCreators(setActiveModal, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCount)

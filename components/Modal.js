import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setActiveModal } from '../store/actions'
import Transition from 'react-addons-css-transition-group'

import stylesheet from 'styles/modal.scss'

class Modal extends React.Component {
  handleClick = (e) => {
    e.stopPropagation();
    if(e.target == this.bg){
      this.props.setActiveModal(null);
    }
  }
  render(){
    return(
      <Transition
          transitionName="fade"
          transitionEnterTimeout={400}
          transitionLeaveTimeout={300}>
        {
          this.props.modal &&
          <div className="modal-bg" ref={node => this.bg = node} onClick={this.handleClick}>
            <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
            <div className="modal-content" onClick={this.handleClick}>
              <button type="button" className="close" aria-label="Close" onClick={()=>this.props.setActiveModal(null)}>
                <span className="icon-times"></span>
              </button>
              <div className="modal-body">
                {this.props.children}
              </div>
            </div>
          </div>
        }
      </Transition>
    )
  }
}    

const mapStateToProps = ({ modal }) => {
  return ({
    modal: modal
  })
}

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveModal: bindActionCreators(setActiveModal, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal)

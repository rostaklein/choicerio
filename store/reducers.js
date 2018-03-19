import { actionTypes } from "./actions";
import { exampleInitialState } from "./index";

export const reducer = (state = exampleInitialState, action) => {
    switch (action.type) {
      case actionTypes.ADD:
        return Object.assign({}, state, {
          count: state.count + 1
        })
      case actionTypes.SETCOUNT:
        return Object.assign({}, state, {
          count: action.count
        })
      case actionTypes.SETNUMTITLE:
        return Object.assign({}, state, {
          pageTitle: state.count
        })
      case actionTypes.SETUSER:
        return Object.assign({}, state, {
          user: action.user
        })
      case actionTypes.SETMODAL:
        return Object.assign({}, state, {
          modal: action.modal
        })
        
      default: return state
    }
  }
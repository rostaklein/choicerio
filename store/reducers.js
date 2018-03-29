import { actionTypes } from "./actions";
import { exampleInitialState } from "./index";

export const reducer = (state = exampleInitialState, action) => {
    switch (action.type) {
      case actionTypes.SETTITLE:
        return Object.assign({}, state, {
          title: action.title
        })
      case actionTypes.SETUSER:
        return Object.assign({}, state, {
          user: action.user
        })
      case actionTypes.SETMODAL:
        return Object.assign({}, state, {
          modal: action.modal
        })
      case actionTypes.EDITFORM:
        return Object.assign({}, state, {
          form: {...state.form, ...action.property}
        })
        
      default: return state
    }
  }
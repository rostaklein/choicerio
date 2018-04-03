import { actionTypes } from "./actions";
import { exampleInitialState } from "./index";

export const reducer = (state = exampleInitialState, action) => {
    switch (action.type) {
      case actionTypes.SETTITLE:
        return Object.assign({}, state, {
          pageTitle: action.pageTitle
        })
      case actionTypes.SETUSER:
        return Object.assign({}, state, {
          user: action.user
        })
      case actionTypes.SETMODAL:
        return Object.assign({}, state, {
          modal: action.modal
        })
      case actionTypes.SETFORMDATA:
        return Object.assign({}, state, {
          form: action.form
        })
      case actionTypes.RESETFORMDATA:
        return Object.assign({}, state, {
          form: exampleInitialState.form
        })
      case actionTypes.EDITFORM:
        return Object.assign({}, state, {
          form: {...state.form, ...action.property}
        })
        
      default: return state
    }
  }
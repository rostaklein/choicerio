import { actionTypes } from "./actions";
import { initialState } from "./index";

export const reducer = (state = initialState, action) => {
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
          form: initialState.form
        })
      case actionTypes.EDITFORM:
        return Object.assign({}, state, {
          form: {...state.form, ...action.property}
        })
      case actionTypes.SETRESSTEP:
        return Object.assign({}, state, {
          responding: {...state.responding, step: action.step}
        })
      default: return state
    }
  }
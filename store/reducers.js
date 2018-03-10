import { actionTypes } from "./actions";
import exampleInitialState from "./actions";

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
        console.log("Setting "+state.count+" as a title");
        return Object.assign({}, state, {
          pageTitle: state.count
        })
      case actionTypes.SETUSER:
        console.log("Setting active user to: ", action.user)
        return Object.assign({}, state, {
          user: action.user
        })
        
      default: return state
    }
  }
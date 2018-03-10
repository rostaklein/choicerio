import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

const exampleInitialState = {
  count: 0,
  pageTitle: "first",
  user: null
}

export const actionTypes = {
  ADD: 'ADD',
  SETCOUNT: 'SETCOUNT',
  SETNUMTITLE: 'SETNUMTITLE',
  SETUSER: 'SETUSER'
}

// REDUCERS
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

// ACTIONS
export const addCount = () => dispatch => {
  return dispatch({ type: actionTypes.ADD })
}

export const setCount = (count) => dispatch => {
  return dispatch({ type: actionTypes.SETCOUNT, count: count })
}

export const setNumberAsTitle = () => dispatch => {
  return dispatch({ type: actionTypes.SETNUMTITLE })
}

export const setActiveUser = (user) => dispatch => {
  return dispatch({ type: actionTypes.SETUSER, user: user})
}

export const initStore = (initialState = exampleInitialState) => {
  return createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)))
}

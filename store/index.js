import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import { reducer } from "./reducers"

export const exampleInitialState = {
  pageTitle: "",
  user: null,
  modal: null,
  form: {
    name: "",
    description: "",
    questions: [],
    candidates: []
  },
  responding: {
    step: "welcome",
    answers: []
  }
}

export const initStore = (initialState = exampleInitialState) => {
  return createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)))
}

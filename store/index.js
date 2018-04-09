import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import { reducer } from "./reducers"

export const initialState = {
  pageTitle: "",
  user: null,
  modal: null,
  form: {
    name: "",
    description: "",
    questions: [],
    candidates: []
  },
  answers: {}
}

export const initStore = (initialState = initialState) => {
  return createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)))
}

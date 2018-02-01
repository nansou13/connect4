import { compose, createStore } from 'redux'
import reducer from './reducers'

const enhancer = compose(
  typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : x => x
)

export const store = createStore(reducer, enhancer)

import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import notificationReducers from './reducers/notificationReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import blogsReducer from './reducers/blogsReducer'

const reducer = combineReducers({
  notification: notificationReducers,
  blogs: blogsReducer
})

const store = createStore(reducer,composeWithDevTools(applyMiddleware(thunk)))

export default store
import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import notificationReducers from './reducers/notificationReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import blogsReducer from './reducers/blogsReducer'
import userReducer from './reducers/userReducer'
import usersReducer from './reducers/usersReducer'

const reducer = combineReducers({
  notification: notificationReducers,
  blogs: blogsReducer,
  user: userReducer,
  users: usersReducer
})

const store = createStore(reducer,composeWithDevTools(applyMiddleware(thunk)))

export default store
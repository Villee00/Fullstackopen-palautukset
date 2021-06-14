import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import notificationReducers from './reducers/notificationReducer'

const store = createStore(notificationReducers,applyMiddleware(thunk))

export default store
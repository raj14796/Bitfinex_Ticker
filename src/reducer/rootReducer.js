import { combineReducers } from 'redux'
import connection from './connection'
import msgData from './msgData'

export default combineReducers({
    connection,
    msgData
})
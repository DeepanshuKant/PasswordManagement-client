import { combineReducers } from 'redux'

import userReducer from './userReducer/user.reducer'
import listReducer from './listReducer/list.reducer'

const rootReducer = combineReducers(
    {
        // Add your reducers here
        userReducer,
        listReducer
    }
)

export default rootReducer
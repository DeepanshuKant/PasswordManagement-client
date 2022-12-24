import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
// import { composeWithDevTools } from 'redux-devtools-extension'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

//Import reducer here
import rootReducer from './reducers/rootReducer'


const middlewares = [thunk];

// if (process.env.NODE_ENV === "development") {

//     const { logger } = require('redux-logger')
//     middlewares.push(logger)
// }

const persistConfig = {
    key: 'main-root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistedReducer, {}, applyMiddleware(...middlewares))

const Persistor = persistStore(store)

export { Persistor }
export default store;
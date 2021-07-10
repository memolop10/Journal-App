import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import thunk from 'redux-thunk';

import { authReducer } from "../components/reducers/authReducer";

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;


const reducer = combineReducers({
    auth: authReducer
})

export const store = createStore( 
    reducer,
    composeEnhancers(
        applyMiddleware(thunk)
    )
)
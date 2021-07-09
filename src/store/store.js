import { combineReducers, createStore } from "redux";
import { authReducer } from "../components/reducers/authReducer";

const reducer = combineReducers({
    auth: authReducer
})

export const store = createStore( 
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
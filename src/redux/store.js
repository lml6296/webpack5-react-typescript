import { createStore, combineReducers } from "redux";
import { collapsedReducer } from "./reducer/collapsedReducer";

const reducer = combineReducers({
    // collapsedReducer: collapsedReducer,
    collapsedReducer
})
const store = createStore(reducer);

export default store;
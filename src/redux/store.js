import { createStore, combineReducers } from "redux";
import { collapsedReducer } from "./reducer/collapsedReducer";
import { loadingReducer } from "./reducer/loadingReducer";

const reducer = combineReducers({
    // collapsedReducer: collapsedReducer,
    collapsedReducer,
    loadingReducer
})
const store = createStore(reducer);

export default store;
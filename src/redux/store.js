import { createStore, combineReducers } from "redux";
import { collapsedReducer } from "./reducer/collapsedReducer";
import { loadingReducer } from "./reducer/loadingReducer";
import { loginReducer } from "./reducer/loginReducer";
// 状态管理，持久化
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['loadingReducer']
}
const reducer = combineReducers({
    // collapsedReducer: collapsedReducer,
    collapsedReducer,
    loadingReducer,
    loginReducer
})
const persistedReducer = persistReducer(persistConfig, reducer)
const store = createStore(persistedReducer);
const persistor = persistStore(store); 

export { store, persistor }; 
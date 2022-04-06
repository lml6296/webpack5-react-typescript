import { createStore, combineReducers, applyMiddleware } from "redux";
import { collapsedReducer } from "./reducer/collapsedReducer";
import { loadingReducer } from "./reducer/loadingReducer";
import { loginReducer } from "./reducer/loginReducer";
import { userReducer } from "./reducer/userReducer";
// 导入saga,最终需要run一下执行saga
import { rootSaga } from "./sagas/index";
import createSagaMiddleware from 'redux-saga';
// import sagaPromiseMiddleware from '../middlewares/sagaPromiseMiddleware'
const sagaMiddleware = createSagaMiddleware(); // 创建redux middleware
const enhancers = applyMiddleware(sagaMiddleware); // 关联store
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
    loginReducer,
    userReducer
})
const persistedReducer = persistReducer(persistConfig, reducer)
const store = createStore(persistedReducer, {}, enhancers);
const persistor = persistStore(store); 
// sagaMiddleware.run(defSaga);不能放于创建store引用saga中间件之前，否则会出现以下报错
// Before running a Saga, you must mount the Saga middleware on the Store using applyMiddleware with redux tool
sagaMiddleware.run(rootSaga);

export { store, persistor }; 
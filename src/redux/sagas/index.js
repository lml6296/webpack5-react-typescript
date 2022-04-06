import { all } from 'redux-saga/effects';
// 导入所有的saga
import { loginSaga } from './loginSaga';
import { userSaga } from './userSaga';

export function* rootSaga() {
    // all()创建一个Effect描述信息，用来命令middleware并行的运行多个Effect，并等待它们全部完成
    yield all([
        loginSaga(),
        userSaga(),
    ])
}
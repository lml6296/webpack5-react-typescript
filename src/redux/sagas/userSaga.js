// 着3个函数都是用来监听action的，只要action发送过来，就会触发对应的saga函数的调用
import { call, put, select, takeEvery, takeLatest, throttle } from 'redux-saga/effects';
import axios from 'axios';
import userActions from '../actions/userActions';

// type SagaAction = {
//     type: string,
//     payload: any,
//     deferred: {
//       resolve: (value?: any) => void,
//       reject: (reason?: any) => void,
//     },
// }

export function* userSaga() {
    yield takeLatest(userActions.fetchUserListSaga, function* (action) {
        try {
            const res = yield call(axios.get, '/users');
            yield put(userActions.saveUserList(res.data));
        } catch {
        }
    });
    yield takeEvery(userActions.changeStatusSaga, function* (action) {
        const { item } = action.payload;
        try {
            yield call(axios.patch, `/users/${item.id}`, {roleState: !item.roleState});
            const res = yield call(axios.get, '/users');
            yield put(userActions.saveUserList(res.data));
        } catch {
            
        }
    })
}
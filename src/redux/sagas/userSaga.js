// 着3个函数都是用来监听action的，只要action发送过来，就会触发对应的saga函数的调用
import { call, put, select, takeEvery, takeLatest, throttle } from 'redux-saga/effects';
import axios from 'axios';
import userActions from '../actions/userActions';
// action = {
//     type,
//     payload,
//     deferred: {
//         resolve,
//         reject,
//     }
// }
export function* userSaga() {
    yield takeLatest(userActions.fetchUserListSaga, function* (action) {
        const {deferred} = action;
        try {
            const res = yield call(axios.get, '/users');
            deferred.resolve(res.data);
            yield put(userActions.saveUserList(res.data));
        } catch {
            deferred.reject();
        }
    });
    yield takeEvery(userActions.changeStatusSaga, function* (action) {
        const {deferred} = action;
        const { item } = action.payload;
        const roleState = !item.roleState;
        try {
            yield call(axios.patch, `/users/${item.id}`, {roleState});
            deferred.resolve();
        } catch {
            
        }
    })
}
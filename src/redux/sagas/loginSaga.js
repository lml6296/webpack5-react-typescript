import { call, put, select, takeEvery, takeLatest } from "redux-saga/effects";
import axios from "axios";
import loginActions from "../actions/loginActions";

export function* loginSaga() {
    yield takeLatest(loginActions.loginSaga1, function* (action){
        const { payload } = action;
        try {
            // 发送网络请求到后台,call是阻塞型effect
            const res = yield call(axios.get, `/staffs?username=${payload.username}&password=${payload.password}`);
            // 如果登录成功，发送一个登录成功的action
            if (res.data.length > 0) {
                yield put(loginActions.saveRefreshToken(res.data[0].refreshToken));
                yield put(loginActions.saveRoleType(res.data[0].roleType));
            } else {
                // 登录失败，发送一个失败的action
                yield put(loginActions.loginFailed());
            }
        } catch (error) {
            // 发送一个登录失败的action
            yield put(loginActions.loginFailed());
        }
    })

}
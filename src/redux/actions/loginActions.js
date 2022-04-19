import { createActions } from './actionHelper';

export default createActions (
    {
        // 自调用函数，返回值为对象
        loginSaga1: (username, password) => ({username, password}),
        saveRoleType: (roleType) => ({roleType}),
        saveRefreshToken: (refreshToken) => ({refreshToken}),
        userLogOut: () => ({}),
        loginFailed: () => ({}),
    },
    'LOGIN',
)
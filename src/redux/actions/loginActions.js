import { createActions } from './actionHelper';

export default createActions (
    {
        loginSaga1: (username, password) => ({username, password}),
        saveRoleType: (roleType) => ({roleType}),
        saveRefreshToken: (refreshToken) => ({refreshToken}),
        userLogOut: () => ({}),
        loginFailed: () => ({}),
    },
    'LOGIN',
)
// exports.loginActions = {
//     login: 'login'
// }
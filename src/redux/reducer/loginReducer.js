import loginActions from "../actions/loginActions";
export const loginReducer = (preState = {
  roleType: '',
  isLogin: false,
}, action) => {
  let { type, payload } = action;
  let newState = { ...preState };
  switch (type) {
    // 退出登录
    case loginActions.userLogOut.toString():
      localStorage.removeItem('token');
      return preState;
    // 登录成功,保存roleType
    case loginActions.saveRoleType.toString():
      newState.roleType = payload.roleType;
      newState.isLogin = true;
      return newState;
    // 登录成功保存refreshToken
    case loginActions.saveRefreshToken.toString():
      const refreshToken = payload.refreshToken;
      localStorage.setItem('token', JSON.stringify(refreshToken));
      return preState;
    // 登录失败
    case loginActions.loginFailed.toString():
      newState.isLogin = false;
      return newState;
    default:
      return preState;
  }
}
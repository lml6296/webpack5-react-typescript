export const loginReducer = (preState = {
  roleType: '',
}, action) => {
  let { type, payload } = action;
  switch (type) {
    case 'save_roleType':
      let newState = { ...preState };
      newState.roleType = payload;
      return newState;
    default:
      return preState;
  }
}
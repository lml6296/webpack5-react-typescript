import userActions from "../actions/userActions";

export const userReducer = (preState = {
    userList: [],
}, action) => {
    let { type, payload } = action;
    let newState = { ...preState };
    switch(type) {
        case userActions.saveUserList.toString():
            newState.userList = payload.userList;
            return newState;
        case userActions.changeStatus.toString():
            
        default:
            return preState;
    }
}
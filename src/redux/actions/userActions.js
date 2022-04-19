import { createActions } from './actionHelper';

export default createActions (
    {
        // 自调用函数
        fetchUserListSaga: () => ({}),
        saveUserList: (userList) => ({userList}),
        changeStatusSaga: (item) => ({item}),
        changeStatus: (item) => ({item}),
    },
    'USER'
)
import { createActions } from './actionHelper';

export default createActions (
    {
        fetchUserListSaga: () => ({}),
        saveUserList: (userList) => ({userList}),
        changeStatusSaga: (item) => ({item}),
        changeStatus: (item) => ({item}),
    },
    'USER'
)
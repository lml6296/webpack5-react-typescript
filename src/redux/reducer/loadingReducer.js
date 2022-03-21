export const loadingReducer = (preState = {
    isLoading: false,
}, action) => {
    let { type, payload } = action;
    switch(type) {
        case 'change_loading':
            let newState = { ...preState };
            newState.isLoading = payload;
            return newState;
        default:
            return preState;
    }
}
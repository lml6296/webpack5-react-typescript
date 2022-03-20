export const collapsedReducer = (preState = {
    isCollapsed: false,
}, action) => {
    let { type } = action;
    switch(type) {
        case 'change_collapsed_action':
            let newState = { ...preState };
            newState.isCollapsed = !newState.isCollapsed;
            return newState;
        default:
            return preState;
    }

}
import axios from "axios";
import store from '../redux/store';

axios.defaults.baseURL = 'http://localhost:9000';
// 请求拦截
axios.interceptors.request.use(function(config) {
    // 显示loading
    store.dispatch({
        type: 'change_loading_action',
        payload: true,
    })
}, function(error) {
    return Promise.reject(error);
})
// 响应拦截
axios.interceptors.response.use(function(config) {
    // 隐藏loading
    store.dispatch({
        type: 'change_loading_action',
        payload: false,
    })
}, function(error) {
    store.dispatch({
        type: 'change_loading_action',
        payload: false,
    })
    return Promise.reject(error);
})
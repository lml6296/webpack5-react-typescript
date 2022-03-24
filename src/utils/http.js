import axios from "axios";
import { store } from '../redux/store';

axios.defaults.baseURL = 'http://localhost:8000';
// 请求拦截
axios.interceptors.request.use(function(config) {
    // 显示loading
    store.dispatch({
        type: 'change_loading',
        payload: true,
    });
    return config;
}, function(error) {
    return Promise.reject(error);
})
// 响应拦截
axios.interceptors.response.use(function(config) {
    // 隐藏loading
    store.dispatch({
        type: 'change_loading',
        payload: false,
    });
    return config;
}, function(error) {
    store.dispatch({
        type: 'change_loading',
        payload: false,
    })
    console.log(error)
    return Promise.reject(error);
})
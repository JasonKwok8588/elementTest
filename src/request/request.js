import axios from 'axios';
import qs from 'qs';

const instance = axios.create({
    timeout: 10000,
});

//请求拦截器
instance.interceptors.request.use(config => {
    //请求时要干的事情
    //转换请求内容中的格式
    if (config.method === 'post') {
        config.data = config.data || '';
        config.data = qs.stringify(config.data);
    }
    return config;
}, error => {
    return Promise.reject(error);
})

//响应拦截器
instance.interceptors.response.use(values => {
    return values.data;
}, error => {
    return Promise.reject(error);
})

export default instance;
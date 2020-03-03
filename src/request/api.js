import request from './request';
const pre = '/api';

export const loginApi = param => request.post(pre + '/tokens', param);
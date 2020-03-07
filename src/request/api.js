import request from './request';
const pre = '/api';
// 登录接口
export const loginApi = param => request.post(pre + '/tokens', param);
// 获取部门数据接口
export const departmentsApi = param => request.get(pre + '/departments', { params: param });
// 获取部门数据接口
export const addDepartmentsApi = param => request.post(pre + '/departments', param);
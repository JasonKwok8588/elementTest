import request from './request';
const pre = '/api';
// 登录接口
export const loginApi = param => request.post(pre + '/tokens', param);
// 获取部门数据接口
export const departmentsApi = param => request.get(pre + '/departments', { params: param });
// 获取部门数据接口
export const addDepartmentsApi = param => request.post(pre + '/departments', param);
// 编辑部门接口
export const editDepartmentsApi = param => request.put(pre + '/departments/' + param.id, param);
// 删除部门接口
export const delDepartmentsApi = param => request.delete(pre + '/departments/' + param.id, param);
// 引入request.js
import request from '@/utils/request.js'

/* 登陆请求 */
export function login(ask) {
  return request.post('/users/checkLogin', ask)
}

/* 添加账号请求 */
export function add(ask) {
  return request.post('/users/add', ask)
}

/* 获取账号列表请求 */
export function getList(ask) {
  return request.get('/users/list', ask)
}

/* 删除账号请求 */
export function delAccount(ask) {
  return request.get('/users/del', ask)
}

/* 批量删除请求 */
export function batchdel(ask) {
  return request.get('/users/batchdel', ask)
}

/* 修改账号请求 */
export function editAccount(ask) {
  return request.post('/users/edit', ask)
}

/* 验证旧密码请求 */
export function checkoldpwd(ask) {
  return request.get('/users/checkoldpwd', ask)
}

/* 修改密码请求 */
export function editpwd(ask) {
  return request.post('/users/editpwd', ask)
}

/* 个人中心 */
export function mineInfo(ask) {
  return request.get('/users/info', ask)
}

/* 修改头像 */
export function avataredit(ask) {
  return request.get('/users/avataredit', ask)
}

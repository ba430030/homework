import request from '@/utils/request.js'

/* 商品分类 */
export function getCateList(ask) {
  return request.get('/goods/catelist', ask)
}

/* 修改分类 */
export function cateEdit(ask) {
  return request.post('/goods/editcate', ask)
}

/* 添加分类 */
export function cateAdd(ask) {
  return request.post('/goods/addcate', ask)
}

/* 删除分类 */
export function cateDel(ask) {
  return request.get('/goods/delcate', ask)
}

/* 添加商品 */
export function proAdd(ask) {
  return request.post('/goods/add', ask)
}

/* 获取商品 */
export function proGet(ask) {
  return request.get('/goods/list', ask)
}

/* 删除商品 */
export function proDel(ask) {
  return request.get('/goods/del', ask)
}

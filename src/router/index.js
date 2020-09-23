import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../layout/Index.vue'
import local from '@/utils/local.js'

Vue.use(VueRouter)

/* 解决了点击同一导航触发报错 */
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    redirect: '/dashboard',
    component: Index,
    children: [
      {
        path: '/dashboard',
        component: () =>
          import(
            /* WebpackChunkName:"Dashboard" */ '../views/dashboard/Index.vue'
          )
      },
      {
        path: '/order',
        redirect: '/order/ordercontent',
        meta: { title: '订单管理' },
        component: () =>
          import(/* WebpackChunkName:"Order" */ '../views/order/Index.vue'),
        children: [
          {
            path: '/order/ordercontent',
            meta: { title: '订单详情' },
            component: () =>
              import(
                /* WebpackChunkName:"OrderContent" */ '../views/order/Order.vue'
              )
          }
        ]
      },
      {
        path: '/product',
        redirect: '/product/productlist',
        meta: { title: '商品管理' },
        component: () =>
          import(/* WebpackChunkName:"Product" */ '../views/product/Index.vue'),
        children: [
          {
            path: '/product/productlist',
            meta: { title: '商品列表' },
            component: () =>
              import(
                /* WebpackChunkName:"ProductList" */ '../views/product/ProductList.vue'
              )
          },
          {
            path: '/product/productadd',
            meta: { title: '商品添加' },
            component: () =>
              import(
                /* WebpackChunkName:"ProductAdd" */ '../views/product/ProductAdd.vue'
              )
          },
          {
            path: '/product/productcate',
            meta: { title: '商品分类' },
            component: () =>
              import(
                /* WebpackChunkName:"ProductCate" */ '../views/product/ProductCate.vue'
              )
          }
        ]
      },
      {
        path: '/store',
        redirect: '/store/storecontent',
        meta: { title: '店铺管理' },
        component: () =>
          import(/* WebpackChunkName:"Store" */ '../views/store/Index.vue'),
        children: [
          {
            path: '/store/storecontent',
            meta: { title: '店铺详情' },
            component: () =>
              import(
                /* WebpackChunkName:"StoreContent" */ '../views/store/Store.vue'
              )
          }
        ]
      },
      {
        path: '/acount',
        redirect: '/acount/acountlist',
        meta: { title: '账号管理' },
        component: () =>
          import(/* WebpackChunkName:"Acount" */ '../views/acount/Index.vue'),
        children: [
          {
            path: '/acount/acountlist',
            meta: { title: '账号列表' },
            component: () =>
              import(
                /* WebpackChunkName:"AcountList" */ '../views/acount/AcountList.vue'
              )
          },
          {
            path: '/acount/acountadd',
            meta: { title: '添加账号' },
            component: () =>
              import(
                /* WebpackChunkName:"AcountAdd" */ '../views/acount/AcountAdd.vue'
              )
          },
          {
            path: '/acount/resetpwd',
            meta: { title: '修改密码' },
            component: () =>
              import(
                /* WebpackChunkName:"ResetPwd" */ '../views/acount/ResetPwd.vue'
              )
          },
          {
            path: '/acount/mine',
            meta: { title: '修改密码' },
            component: () =>
              import(
                /* WebpackChunkName:"ResetPwd" */ '../views/acount/Mine.vue'
              )
          }
        ]
      },
      {
        path: '/saleCount',
        redirect: '/saleCount/GoodsCount',
        meta: { title: '销售统计' },
        component: () =>
          import(
            /* WebpackChunkName:"saleCount" */ '../views/saleCount/Index.vue'
          ),
        children: [
          {
            path: '/saleCount/GoodsCount',
            meta: { title: '商品统计' },
            component: () =>
              import(
                /* WebpackChunkName:"GoodsCount" */ '../views/saleCount/GoodsCount.vue'
              )
          },
          {
            path: '/saleCount/OrderCount',
            meta: { title: '订单统计' },
            component: () =>
              import(
                /* WebpackChunkName:"OrderCount" */ '../views/saleCount/OrderCount.vue'
              )
          }
        ]
      }
    ]
  },
  {
    path: '/login',
    component: () =>
      import(/* WebpackChunkName:"Login" */ '../views/login/Index.vue')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const token = local.get('t_k') || ''
  if (token) {
    next()
  } else if (to.path === '/login') {
    next()
  } else {
    next('/login')
  }
})

export default router

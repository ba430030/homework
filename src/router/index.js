import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../layout/Index.vue'

Vue.use(VueRouter)

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
        component: () =>
          import(/* WebpackChunkName:"Order" */ '../views/order/Index.vue'),
        children: [
          {
            path: '/order/ordercontent',
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
        component: () =>
          import(/* WebpackChunkName:"Product" */ '../views/product/Index.vue'),
        children: [
          {
            path: '/product/productlist',
            component: () =>
              import(
                /* WebpackChunkName:"ProductList" */ '../views/product/ProductList.vue'
              )
          },
          {
            path: '/product/productadd',
            component: () =>
              import(
                /* WebpackChunkName:"ProductAdd" */ '../views/product/ProductAdd.vue'
              )
          },
          {
            path: '/product/productcate',
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
        component: () =>
          import(/* WebpackChunkName:"Store" */ '../views/store/Index.vue'),
        children: [
          {
            path: '/store/storecontent',
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
        component: () =>
          import(/* WebpackChunkName:"Acount" */ '../views/acount/Index.vue'),
        children: [
          {
            path: '/acount/acountlist',
            component: () =>
              import(
                /* WebpackChunkName:"AcountList" */ '../views/acount/AcountList.vue'
              )
          },
          {
            path: '/acount/acountadd',
            component: () =>
              import(
                /* WebpackChunkName:"AcountAdd" */ '../views/acount/AcountAdd.vue'
              )
          },
          {
            path: '/acount/resetpwd',
            component: () =>
              import(
                /* WebpackChunkName:"ResetPwd" */ '../views/acount/ResetPwd.vue'
              )
          }
        ]
      },
      {
        path: '/saleCount',
        redirect: '/saleCount/GoodsCount',
        component: () =>
          import(
            /* WebpackChunkName:"saleCount" */ '../views/saleCount/Index.vue'
          ),
        children: [
          {
            path: '/saleCount/GoodsCount',
            component: () =>
              import(
                /* WebpackChunkName:"GoodsCount" */ '../views/saleCount/GoodsCount.vue'
              )
          },
          {
            path: '/saleCount/OrderCount',
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

export default router

import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Products from '@/components/Products'
import ProductsAdd from '@/components/ProductsAdd'
import ProductsEdit from '@/components/ProductsEdit'
import ProductsDelete from '@/components/ProductsDelete'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/products',
      component: Products
    },
    {
      path: '/products/add',
      component: ProductsAdd
    },
    {
      path: '/products/:id/edit',
      component: ProductsEdit
    },
    {
      path: '/products/:id/delete',
      component: ProductsDelete
    }
  ]
})

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App'
import router from './router'
import GoBack from '@/components/GoBack'

Vue.use(VueResource)
Vue.component('go-back', GoBack)

Vue.config.productionTip = false
Vue.http.options.root = process.env.SUPERMARKET_API_URL
// Vue.http.headers.common['Content-Type'] = 'application/json'
// Vue.http.headers.common['Authorization'] = ''

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

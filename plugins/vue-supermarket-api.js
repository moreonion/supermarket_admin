import Vue from 'vue'
import VueSupermarketApi from '../vue-supermarket-api'

import config from '../nuxt.config.js'

Vue.use(VueSupermarketApi, {
  axios: {
    baseURL: config.supermarketApi.baseURL
  }
})

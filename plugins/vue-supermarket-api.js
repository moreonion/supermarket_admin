import Vue from 'vue'
import VueSupermarketApi from '../vue-supermarket-api'

Vue.use(VueSupermarketApi, {
  axios: {
    baseURL: process.env.API_BASE_URL || 'https://api.supplychainge.org/api/v1/'
  }
})

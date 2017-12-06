/* global describe, it */
import { assert } from 'chai'

import VueSupermarketApi from '../src/'

// a stub constructor function to get to the this.$supermarket functions
const Vue = function () {}
Vue.prototype.a = {}

describe('VueSupermarketApi', function () {
  describe('the plugin functionality', function () {
    it('should install', function () {
      VueSupermarketApi.install(Vue)
      const vm = new Vue()
      assert.isDefined(vm.$supermarket)
    })
  })
})

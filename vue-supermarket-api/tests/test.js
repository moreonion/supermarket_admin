/* global describe, it */
import { assert } from 'chai'

import VueSupermarketApi from '../src/'
import { projectColumns, constructFilter } from '../src/utils'

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
  describe('utils', function () {
    describe('projectColumns()', function () {
      it('returns empty params if called empty', function () {
        const expected = {
          only: '',
          include: ''
        }

        const params = projectColumns('labels', [])

        assert.deepEqual(params, expected)
      })
      it('uniquifies', function () {
        const expected = {
          only: 'id',
          include: ''
        }

        const params = projectColumns('labels', ['id', 'id'])

        assert.deepEqual(params, expected)
      })
    })
    describe('constructFilter()', function () {
      it('maps a query to params', function () {
        const query = {
          'credibility': { '$lt': 3 },
          'animal': { '$gte': 2 }
        }
        const expected = {
          'details.score.animal_welfare:ge': 2,
          'details.score.credibility:lt': 3
        }

        const actual = constructFilter('labels', query)

        assert.deepEqual(actual, expected)
      })
      it('splits query ANDs for same field to multiple params', function () {
        const query = {
          'credibility': { '$gte': 0, '$lt': 4 }
        }
        const expected = {
          'details.score.credibility:ge': 0,
          'details.score.credibility:lt': 4
        }

        const actual = constructFilter('labels', query)

        assert.deepEqual(actual, expected)
      })
    })
  })
})

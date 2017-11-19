import axios from 'axios'
import merge from 'lodash.merge'
import uniq from 'lodash.uniq'
import projections from './projections'

const defaults = {
  // compare to axios.defaults
  axios: {},
  projections: []
}

/*
 * get columns, read projections for columns and return
 * param strings for the API (to be consumed by axios)
 */
const projectColumns = (columns) => {
  const proj = columns.reduce((acc, item) => {
    acc.only = uniq(acc.only.concat(projections[item].only))
    acc.include = uniq(acc.include.concat(projections[item].include))
    return acc
  }, { only: [], include: [] })

  const params = {
    only: proj.only.join(','),
    include: proj.include.join(',')
  }

  return params
}

const VueSupermarketApi = {
  install (Vue, params = {}) {
    // axios params
    this.params = merge(defaults, params)

    // internal axios instance for calling the supermarket API
    this.axios = axios.create(this.params.axios)

    Vue.prototype.$supermarket = {
      // query the API
      // returns a axios Promise
      query: (endpoint, options = {}, columns = []) => {
        const defaults = {
          url: endpoint,
          method: 'get',
          params: {
            page: 1,
            limit: 10
          }
        }
        const req = merge(defaults, options)

        const projectionParams = projectColumns(columns)
        req.params = merge(req.params, projectionParams)

        return this.axios.request(req)
      },
      // set the authorization header
      // delete the header by setting it to null
      setAuth: (accessToken) => {
        if (accessToken) {
          this.axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
        } else {
          delete this.axios.defaults.headers.common['Authorization']
        }
      },
      // make the axios instance available on this.$supermarket.axios
      axios: this.axios
    }
  }
}

export default VueSupermarketApi

import axios from 'axios'
import merge from 'lodash.merge'
import uniq from 'lodash.uniq'
import projections from './projections'

const defaults = {
  // compare to axios.defaults
  axios: {},
  projections: [],
  options: {
    fetchFullModel: false,
    accessToken: null
  }
}

/*
 * get columns, read projections for columns and return
 * param strings for the API (to be consumed by axios)
 */
const projectColumns = (endpoint, columns) => {
  const proj = columns.reduce((acc, item) => {
    acc.only = uniq(acc.only.concat(projections[endpoint][item].only))
    acc.include = uniq(acc.include.concat(projections[endpoint][item].include))
    return acc
  }, { only: [], include: [] })

  const params = {
    only: proj.only.join(','),
    include: proj.include.join(',')
  }

  return params
}

const VueSupermarketApi = {
  install (Vue, config = {}) {
    // axios params
    this.config = merge(defaults, config)

    // internal axios instance for calling the supermarket API
    this.axios = axios.create(this.config.axios)

    Vue.prototype.$supermarket = {
      // query the API for a list of items
      // returns a axios Promise
      query: (endpoint, axiosOptions = {}, columns = [], options = {}) => {
        const axiosDefaults = {
          url: endpoint,
          method: 'get',
          params: {
            page: 1,
            limit: 10
          }
        }

        axiosOptions = merge(axiosDefaults, axiosOptions)
        options = merge(defaults.options, options)

        const projectionParams = projectColumns(endpoint, columns)
        axiosOptions.params = merge(axiosOptions.params, projectionParams)

        // if we want to fetch the full model we simply have to make sure that
        // filtering with `only` is not set
        if (options.fetchFullModel && axiosOptions.params['only']) {
          delete axiosOptions.params['only']
        }

        return this.axios.request(axiosOptions)
      },
      // create a new item
      // returns a axios Promise
      create: (endpoint, item, axiosOptions = {}, options = {}) => {
        const axiosDefaults = {
          url: endpoint,
          method: 'post',
          data: item
        }

        axiosOptions = merge(axiosDefaults, axiosOptions)
        options = merge(defaults.options, options)

        if (options.accessToken) {
          axiosOptions = merge(axiosOptions, {
            headers: {
              'Authorization': `Bearer ${options.accessToken}`
            }
          })
        }

        return this.axios.request(axiosOptions)
      },
      // create a new item
      // returns a axios Promise
      update: (endpoint, itemId, item, axiosOptions = {}, options = {}) => {
        const axiosDefaults = {
          url: `${endpoint}/${itemId}`,
          method: 'put',
          data: item
        }

        axiosOptions = merge(axiosDefaults, axiosOptions)
        options = merge(defaults.options, options)

        if (options.accessToken) {
          axiosOptions = merge(axiosOptions, {
            headers: {
              'Authorization': `Bearer ${options.accessToken}`
            }
          })
        }

        return this.axios.request(axiosOptions)
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

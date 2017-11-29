import axios from 'axios'
import merge from 'lodash.merge'
import uniq from 'lodash.uniq'
import operators from './operators'
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

/*
 * for now no nesting with $and or $or is supported
 * we get 1 query object with ANDed fields, which can be filtered by operators
 * no default $eq is implemented yet
 *
 * we return params to be consumable by axios and understandable by the API
 *
 * see: https://docs.mongodb.com/manual/tutorial/query-documents/
 *     {
 *       'credibility': { '$lt': 3 },
 *       'animal': { '$gte': 2 }
 *     }
 */
const constructFilter = (endpoint, query) => {
  const localProjections = projections[endpoint] ? projections[endpoint] : {}
  // all fields in the query
  const params = Object.keys(query).reduce((accum, field) => {
    const projectionIsKnown = Object.keys(localProjections).includes(field)
    // all operators in the field
    Object.keys(query[field]).map((operator) => {
      const operatorIsKnown = Object.keys(operators).includes(operator)
      const value = query[field][operator]
      const valueIsDefinedAndNotNull = !!(value || value === '')

      let fieldName = field
      // if a projection specifies a path/is an alias to the information
      if (projectionIsKnown && !!(localProjections[field]['path'])) {
        fieldName = localProjections[field]['path']
      }
      if (valueIsDefinedAndNotNull && operatorIsKnown) {
        // TODO sanitize/validate/escape field/value
        const key = [fieldName, operators[operator]].join(':')
        accum[key] = value
      }
    }, {})

    return accum
  }, {})

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
      query: (endpoint, axiosOptions = {}, columns = [], filters = {}, options = {}) => {
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

        // apply the projection params
        const projectionParams = projectColumns(endpoint, columns)
        axiosOptions.params = merge(axiosOptions.params, projectionParams)

        // if we want to fetch the full model we simply have to make sure that
        // filtering with `only` is not set
        if (options.fetchFullModel && axiosOptions.params['only']) {
          delete axiosOptions.params['only']
        }

        // apply the filter params
        const filterParams = constructFilter(endpoint, filters)
        axiosOptions.params = merge(axiosOptions.params, filterParams)

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

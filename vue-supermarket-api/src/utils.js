import uniq from 'lodash.uniq'
import operators from './operators'
import projections from './projections'

/*
 * get columns, read projections for columns and return
 * param strings for the API (to be consumed by axios)
 */
export const projectColumns = (endpoint, columns) => {
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
export const constructFilter = (endpoint, query) => {
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
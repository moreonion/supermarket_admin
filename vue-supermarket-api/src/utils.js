import uniq from 'lodash.uniq'
import operators from './operators'
import projections from './projections'

/*
 * get columns, read projections for columns and return
 * param strings for the API (to be consumed by axios)
 *
 * TODO:
 * - inject projections
 * - do err when empty endpoint
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
 *
 * TODO:
 * - inject projections
 * - do err when empty endpoint
 */
export const constructFilter = (endpoint, query) => {
  const localProjections = projections[endpoint] ? projections[endpoint] : {}
  // all fields in the query
  const params = Object.keys(query).reduce((accum, field) => {
    // determine if we have a language part
    const langIndex = field.lastIndexOf('.')
    let projectionName = field
    let language = null
    if (langIndex !== -1) {
      projectionName = field.substring(0, langIndex)
      language = field.substring(langIndex + 1)
    }

    const projectionIsKnown = Object.keys(localProjections).includes(projectionName)

    // determine field name to be sent to API
    let fieldName = projectionName
    // if a projection specifies a path/is an alias to the information
    if (projectionIsKnown && !!(localProjections[projectionName]['path'])) {
      fieldName = localProjections[projectionName]['path']
    }
    // ensure only translatable fields get an language added
    // if the field is not translatable the language get cut off
    if (language && projectionIsKnown) {
      if (localProjections[projectionName]['translatable']) {
        fieldName = [fieldName, language].join('.')
      }
    }

    // all operators in the field
    Object.keys(query[field]).map((operator) => {
      const operatorIsKnown = Object.keys(operators).includes(operator)
      const value = query[field][operator]
      const valueIsDefinedAndNotNull = (typeof value !== 'undefined' && value !== null)

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

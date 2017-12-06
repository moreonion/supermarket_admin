/*
 * see https://docs.mongodb.com/manual/reference/operator/query/
 */
const operators = {
  // MongoDB-style operators
  '$eq': 'eq',
  '$gt': 'gt',
  '$gte': 'ge',
  '$in': 'in',
  '$lt': 'lt',
  '$lte': 'le',
  '$ne': 'ne',
  // '$nin': null, // not implemented in the API

  // custom operators of the API
  '$like': 'like'
}

export default operators

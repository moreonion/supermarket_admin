/*
 * map column identifiers to API
 *
 * Projections here are currently seen as a schema of the API.
 *
 * so there is no need for the ability to inject *different* projections when
 * calling the API; these projections are at the core business logic of this
 * plugin.
 *
 * translatable default: false
 */
const projections = {
  'labels': {
    'id': {
      'only': ['id'],
      'include': []
    },
    'name': {
      'only': ['name'],
      'include': [],
      'translatable': true
    },
    'logo': {
      'only': ['logo'],
      'include': [],
      'translatable': true
    },
    'credibility': {
      'only': ['details'],
      'include': [],
      'path': 'details.score.credibility'
    },
    'environment': {
      'only': ['details'],
      'include': [],
      'path': 'details.score.environment'
    },
    'social': {
      'only': ['details'],
      'include': [],
      'path': 'details.score.social'
    },
    'animal': {
      'only': ['details'],
      'include': [],
      'path': 'details.score.animal_welfare'
    },
    'hotspots': {
      'only': ['hotspots'],
      'include': ['hotspots.name']
    },
    'resources': {
      'only': ['resources'],
      'include': ['resources.name'],
      'path': 'resources.name',
      'translatable': true
    },
    'countries': {
      'only': ['countries'],
      'include': []
    }
  }
}

export default projections

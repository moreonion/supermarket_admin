/*
 * map column identifiers to API
 */
const projections = {
  'labels': {
    'id': {
      'only': ['id'],
      'include': []
    },
    'name': {
      'only': ['name'],
      'include': []
    },
    'logo': {
      'only': ['logo'],
      'include': []
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
      'include': ['resources.name']
    },
    'countries': {
      'only': ['countries'],
      'include': []
    }
  }
}

export default projections

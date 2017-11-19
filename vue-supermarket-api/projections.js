const projections = {
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
    'include': []
  },
  'environment': {
    'only': ['details'],
    'include': []
  },
  'social': {
    'only': ['details'],
    'include': []
  },
  'animal': {
    'only': ['details'],
    'include': []
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

export default projections

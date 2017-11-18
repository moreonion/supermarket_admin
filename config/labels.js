/*
 * config for label API
 */
const LabelApiMapping = {
  fields: [],
  columnValueMap: {
    'id': 'id',
    'name': 'name',
    'credibility': 'details.score.credibility',
    'environment': 'details.score.environment',
    'social': 'details.score.social',
    'animal': 'details.score.animal_welfare',
    'hotspots': 'hotspots',
    'resources': 'resources',
    'countries': 'countries'
  }
}

export default LabelApiMapping

export const state = () => ({
  labels: [], // ids
  labels_states: {},
  // for the column display
  columns: ['id', 'name', 'hotspots', 'resources', 'credibility', 'environment', 'social', 'animal', 'countries'],
  column_states: {
    id: { state: true, order: 'asc' },
    name: { state: true, order: 'asc' },
    hotspots: { state: true, order: 'asc' },
    resources: { state: true, order: 'asc' },
    credibility: { state: true, order: 'asc' },
    environment: { state: true, order: 'asc' },
    social: { state: true, order: 'asc' },
    animal: { state: true, order: 'asc' },
    countries: { state: true, order: 'asc' }
  },
  // array of filters
  // used for app state: persisting filter state when paging the API
  filters: []
})

export const mutations = {
  ENABLE_COLUMN (state, name) {
    state.column_states[name].state = true
  },
  DISABLE_COLUMN (state, name) {
    state.column_states[name].state = false
  },
  SET_FILTERS (state, filters) {
    state.filters = filters
  },
  SET_LABELS (state, labels) {
    state.labels = labels.ids || []
    state.labels_states = labels.states || {}
  }
}

export const getters = {
  // labels
  labels (state) {
    return state.labels
  },
  labelStates (state) {
    return state.labels_states
  },
  // label columns
  orderedColumns (state) {
    return state.columns
  },
  columnStates (state) {
    return state.column_states
  },
  enabledColumns (state) {
    return state.columns.reduce((columns, item) => {
      if (state.column_states[item].state) {
        columns.push(item)
      }
      return columns
    }, [])
  },
  isEnabledColumn (state, getters) {
    return name => {
      return getters.enabledColumns.indexOf(name) !== -1
    }
  },
  filters (state) {
    return state.filters
  }
}

export const actions = {
  enableColumn ({ commit }, name) {
    commit('ENABLE_COLUMN', name)
  },
  disableColumn ({ commit }, name) {
    commit('DISABLE_COLUMN', name)
  },
  toggleColumn ({ commit, getters }, name) {
    getters.isEnabledColumn(name) ? commit('DISABLE_COLUMN', name) : commit('ENABLE_COLUMN', name)
  },
  /*
   * save the current filters for the API queries
   */
  setFilters ({ commit }, filters) {
    commit('SET_FILTERS', filters)
  },
  resetFilters ({ commit }, filters) {
    commit('SET_LABELS', [])
  },
  /*
   * get a list of item objects and reduce it into two structures:
   * a list of the ids and a dict with the label id as key
   */
  setLabels ({ commit }, items) {
    const labels = items.reduce((acc, item) => {
      acc.ids.push(item.id)
      acc.states[item.id] = item
      return acc
    }, { ids: [], states: {} })

    commit('SET_LABELS', labels)
  }
}

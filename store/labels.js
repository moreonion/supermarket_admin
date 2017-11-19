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
  }
})

export const mutations = {
  ENABLE_COLUMN (state, name) {
    state.column_states[name].state = true
  },
  DISABLE_COLUMN (state, name) {
    state.column_states[name].state = false
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
  columns (state) {
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
  }
}

export const actions = {
  enableColumn ({ commit }, name) {
    commit('ENABLE_COLUMN', name)
  },
  disableColumn ({ commit }, name) {
    commit('DISABLE_COLUMN', name)
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

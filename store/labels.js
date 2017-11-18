export const state = () => ({
  labels: [], // ids
  labels_states: {},
  // for the column display
  label_columns: ['id', 'name', 'hotspots', 'resources', 'credibility', 'environment', 'social', 'animal', 'countries'],
  label_column_states: {
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
  ENABLE_LABEL_TABLE_COLUMN (state, name) {
    state.label_column_states[name].state = true
  },
  DISABLE_LABEL_TABLE_COLUMN (state, name) {
    state.label_column_states[name].state = false
  },
  SET_LABELS (state, labels) {
    state.labels = labels.ids || []
    state.labels_states = labels.states || {}
  }
}

export const getters = {
  // labels
  allLabels (state) {
    return state.labels
  },
  allLabelStates (state) {
    return state.labels_states
  },
  // label columns
  allLabelColumns (state) {
    return state.label_columns
  },
  allLabelColumnStates (state) {
    return state.label_column_states
  },
  allEnabledLabelColumns (state) {
    return state.label_columns.reduce((columns, item) => {
      if (state.label_column_states[item].state) {
        columns.push(item)
      }
      return columns
    }, [])
  }
}

export const actions = {
  enableLabelTableColumn ({ commit }, name) {
    commit('ENABLE_LABEL_TABLE_COLUMN', name)
  },
  disableLabelTableColumn ({ commit }, name) {
    commit('DISABLE_LABEL_TABLE_COLUMN', name)
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

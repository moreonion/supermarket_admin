export const state = () => ({
  criteria: [], // ids
  criteria_states: {}
})

export const mutations = {
  SET_CRITERIA (state, criteria) {
    state.criteria = criteria.ids || []
    state.criteria_states = criteria.states || {}
  }
}

export const getters = {
  criteria (state) {
    return state.criteria
  },
  criteriaStates (state) {
    return state.criteria_states
  }
}

export const actions = {
  /*
   * get a list of item objects and reduce it into two structures:
   * a list of the ids and a dict with the id as key
   */
  setCriteria ({ commit }, items) {
    const criteria = items.reduce((acc, item) => {
      acc.ids.push(item.id)
      acc.states[item.id] = item
      return acc
    }, { ids: [], states: {} })

    commit('SET_CRITERIA', criteria)
  }
}

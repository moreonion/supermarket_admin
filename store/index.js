import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      user: null,
      config: {
        languages: ['de', 'en']
      },
      labels: []
    },
    mutations: {
      SET_USER (state, user) {
        state.user = user || null
      },
      SET_LABELS (state, labels) {
        state.labels = labels || []
      }
    },
    getters: {
      isAuthenticated (state) {
        return !!state.user
      },
      loggedUser (state) {
        return state.user
      },
      allLabels (state) {
        return state.labels
      },
      config (state) {
        return state.config
      }
    }
  })
}

export default createStore

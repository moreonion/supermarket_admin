import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      user: null,
      access_token: null,
      config: {
        languages: ['de', 'en']
      },
      labels: []
    },
    mutations: {
      SET_USER (state, user) {
        state.user = user || null
      },
      SET_ACCESS_TOKEN (state, token) {
        state.access_token = token || null
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
      accessToken (state) {
        return state.access_token
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

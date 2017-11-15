import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      user: null,
      access_token: null,
      languages: [ 'de', 'en' ],
      language_states: {
        de: { state: true },
        en: { state: true }
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
      ENABLE_LANGUAGE (state, lang) {
        state.language_states[lang].state = true
      },
      DISABLE_LANGUAGE (state, lang) {
        state.language_states[lang].state = false
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
      allLanguages (state) {
        return state.languages
      },
      allEnabledLanguages (state) {
        return state.languages.reduce((languages, item) => {
          if (state.language_states[item].state) {
            languages.push(item)
          }
          return languages
        }, [])
      }
    },
    actions: {
      enableLanguage ({ commit }, lang) {
        commit('ENABLE_LANGUAGE', lang)
      },
      disableLanguage ({ commit }, lang) {
        commit('DISABLE_LANGUAGE', lang)
      }
    }
  })
}

export default createStore

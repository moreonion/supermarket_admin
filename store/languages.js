export const state = () => ({
  languages: [ 'de', 'en' ],
  language_states: {
    de: { state: true },
    en: { state: true }
  }
})

export const mutations = {
  ENABLE_LANGUAGE (state, name) {
    state.language_states[name].state = true
  },
  DISABLE_LANGUAGE (state, name) {
    state.language_states[name].state = false
  }
}

export const getters = {
  // languages
  orderedLanguages (state) {
    return state.languages
  },
  enabledLanguages (state) {
    return state.languages.reduce((languages, item) => {
      if (state.language_states[item].state) {
        languages.push(item)
      }
      return languages
    }, [])
  },
  isEnabledLanguage (state, getters) {
    return name => {
      return getters.enabledLanguages.indexOf(name) !== -1
    }
  }
}

export const actions = {
  enableLanguage ({ commit }, name) {
    commit('ENABLE_LANGUAGE', name)
  },
  disableLanguage ({ commit }, name) {
    commit('DISABLE_LANGUAGE', name)
  },
  toggleLanguage ({ commit, getters }, name) {
    getters.isEnabledLanguage(name) ? commit('DISABLE_LANGUAGE', name) : commit('ENABLE_LANGUAGE', name)
  }
}

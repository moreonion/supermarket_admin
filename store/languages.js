export const state = () => ({
  languages: [ 'de', 'en' ],
  language_states: {
    de: { state: true },
    en: { state: true }
  }
})

export const mutations = {
  ENABLE_LANGUAGE (state, lang) {
    state.language_states[lang].state = true
  },
  DISABLE_LANGUAGE (state, lang) {
    state.language_states[lang].state = false
  }
}

export const getters = {
  // languages
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
}

export const actions = {
  enableLanguage ({ commit }, lang) {
    commit('ENABLE_LANGUAGE', lang)
  },
  disableLanguage ({ commit }, lang) {
    commit('DISABLE_LANGUAGE', lang)
  }
}

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
      },
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
  })
}

export default createStore

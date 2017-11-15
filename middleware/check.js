// check if we can assume an logged in user
// if we are NOT logged in yet, try to find a id_token in the localStorage
// and initialize the app store

import { getUserFromLocalStorage, getAccessTokenFromLocalStorage } from '~/utils/auth'

export default function ({ isClient, store }) {
  if (!store.getters.isAuthenticated) {
    const user = getUserFromLocalStorage()
    if (user) {
      store.commit('SET_USER', user)
    }

    const token = getAccessTokenFromLocalStorage()
    if (token) {
      store.commit('SET_ACCESS_TOKEN', token)
    }
  }
}

export const state = () => ({
  user: null,
  access_token: null
})

export const mutations = {
  SET_USER (state, user) {
    state.user = user || null
  },
  SET_ACCESS_TOKEN (state, token) {
    state.access_token = token || null
  }
}

export const getters = {
  // authentication/authorization
  isAuthenticated (state) {
    return !!state.user
  },
  loggedUser (state) {
    return state.user
  },
  accessToken (state) {
    return state.access_token
  }
}

import auth0 from 'auth0-js'

const config = require('~/config.json')

const getBaseUrl = () => {
  if (process.SERVER_BUILD) return
  return `${window.location.protocol}//${window.location.host}`
}

export const setToken = (token) => {
  if (process.SERVER_BUILD) return
  window.localStorage.setItem('access_token', token)
}

export const unsetToken = () => {
  if (process.SERVER_BUILD) return
  window.localStorage.removeItem('access_token')
  window.localStorage.removeItem('secret')
  window.localStorage.setItem('logout', Date.now())
}

export const createWebAuth = () => {
  return new auth0.WebAuth(
    {
      clientID: config.AUTH0_CLIENT_ID,
      domain: config.AUTH0_CLIENT_DOMAIN,
      redirectUri: `${getBaseUrl()}/auth/signed-in`,
      audience: 'supermarket-api',
      responseType: 'token',
      scope: 'openid'
    }
  )
}

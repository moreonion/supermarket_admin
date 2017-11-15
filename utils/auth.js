import auth0 from 'auth0-js'

const getBaseUrl = () => {
  if (process.SERVER_BUILD) return
  return `${window.location.protocol}//${window.location.host}`
}

export const setAuth = (token, user) => {
  if (process.SERVER_BUILD) return
  window.localStorage.setItem('access_token', token)
  window.localStorage.setItem('user', JSON.stringify(user))
}

export const unsetAuth = () => {
  if (process.SERVER_BUILD) return
  window.localStorage.removeItem('access_token')
  window.localStorage.removeItem('user')
  window.localStorage.setItem('logout', Date.now())
}

export const getUserFromLocalStorage = () => {
  const json = window.localStorage.user
  return json ? JSON.parse(json) : null
}

export const getAccessTokenFromLocalStorage = () => {
  const token = window.localStorage.access_token
  return token ? token : null // eslint-disable-line no-unneeded-ternary
}

export const createWebAuth = () => {
  return new auth0.WebAuth(
    {
      clientID: process.env.auth0ClientID,
      domain: process.env.auth0ClientDomain,
      redirectUri: `${getBaseUrl()}/auth/signed-in`,
      audience: process.env.auth0Audience,
      responseType: 'token id_token',
      scope: 'openid email'
    }
  )
}

export const loginRedirect = () => {
  // redirect to authentication page of Auth0
  let webAuth = createWebAuth()
  webAuth.authorize()
}

export const logoutRedirect = () => {
  let webAuth = createWebAuth()
  webAuth.logout({
    returnTo: `${getBaseUrl()}/`
  })
}

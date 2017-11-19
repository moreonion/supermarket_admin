module.exports = {
  /*
  ** The mode of Nuxt
  */
  mode: 'spa',
  /*
  ** Environment variables
  */
  env: {
    auth0ClientID: process.env.AUTH0_CLIENT_ID || 'MZ2mvE76dHIpNuWvia8fa6m6FNSpDmPi',
    auth0ClientDomain: process.env.AUTH0_CLIENT_DOMAIN || 'moreonion.eu.auth0.com',
    auth0Audience: process.env.AUTH0_AUDIENCE || 'supermarket-api'
  },
  /*
  ** Router
  */
  router: {
    middleware: 'check'
  },
  /*
  ** Headers of the page
  */
  head: {
    title: 'supermarket-admin',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Admin interface for the Supplycha!nge database.' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLINT on save
    */
    extend (config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  watchers: {
    webpack: {
      aggregateTimeout: 300,
      poll: 1000
    }
  },
  plugins: [
    { src: '~/plugins/vue-notifications', ssr: false },
    { src: '~/plugins/vue-supermarket-api', ssr: false }
  ],
  modules: [
    '@nuxtjs/bootstrap-vue',
    '@nuxtjs/axios'
  ],
  axios: {
    browserBaseURL: process.env.API_BASE_URL || 'https://api.supplychainge.org/api/v1',
    credentials: false
  }
}

<template>
  <section class="container-centered">
    <div>
      <h1 class="title">
        {{ title }}
      </h1>
      <p v-if="errorDescription">{{ errorDescription }}</p>
      <button
        v-if="errorDescription"
        class="btn btn-outline-primary btn-lg"
        @click="loginRedirect()"
      >
        Try again?
      </button>
    </div>
  </section>
</template>

<script>
import jwtDecode from 'jwt-decode'

import { createWebAuth, loginRedirect, setAuth } from '~/utils/auth'

export default {
  data () {
    return {
      title: 'Signing in...',
      errorDescription: null
    }
  },
  mounted () {
    let webAuth = createWebAuth()
    webAuth.parseHash({ hash: window.location.hash }, (err, authResult) => {
      if (err) {
        this.errorDescription = err.errorDescription
        this.title = 'Error!'
        return console.log(err)
      }

      console.log(authResult)

      let user = jwtDecode(authResult.idToken)
      setAuth(authResult.accessToken, user)
      this.$store.commit('SET_USER', user)
      this.$store.commit('SET_ACCESS_TOKEN', authResult.accessToken)

      this.$router.replace('/home')
    })
  },
  methods: {
    loginRedirect
  }
}
</script>

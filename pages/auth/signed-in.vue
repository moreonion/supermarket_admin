<template>
  <p>Signing in...</p>
</template>

<script>
import { createWebAuth, setToken } from '~/utils/auth'

export default {
  mounted () {
    let webAuth = createWebAuth()
    webAuth.parseHash({ hash: window.location.hash }, (err, authResult) => {
      if (err) {
        return console.log(err)
      }

      console.log(authResult)

      setToken(authResult.accessToken)

      this.$router.replace('/')
    })
  }
}
</script>

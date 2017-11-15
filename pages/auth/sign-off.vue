<template>
  <section class="container-centered">
    <div>
      <h1 class="title">
        Signing off...
      </h1>
    </div>
  </section>
</template>

<script>
import { unsetAuth, logoutRedirect } from '~/utils/auth'

export default {
  mounted () {
    unsetAuth()
    this.$store.commit('SET_USER', null)
    this.$store.commit('SET_ACCESS_TOKEN', null)
    logoutRedirect()
  }
}
</script>

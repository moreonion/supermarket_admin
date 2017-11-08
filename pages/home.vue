<template>
  <section class="container">
    <div>
      <h1 class="title">
        Hello {{ loggedUser.email }}!
      </h1>
      <div class="links">
        <nuxt-link v-if="!isAuthenticated" to="/auth/sign-in" class="btn btn-outline-primary btn-lg">Sign in</nuxt-link>
        <nuxt-link v-if="isAuthenticated" to="/" class="btn btn-outline-primary btn-lg">Index</nuxt-link>
        <nuxt-link v-if="isAuthenticated" to="/home" class="btn btn-outline-primary btn-lg">Home</nuxt-link>
        <nuxt-link v-if="isAuthenticated" to="/auth/sign-off" class="btn btn-outline-primary btn-lg">Sign off</nuxt-link>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: mapGetters(['loggedUser', 'isAuthenticated'])
}
</script>

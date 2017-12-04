<template>
  <section class="container-centered">
    <div>
      <h1 class="big-title">
        Supermarket Admin
      </h1>
      <h2 class="subtitle">
        Admin interface for the Supplycha!nge database.
      </h2>
      <div class="btn-group">
        <nuxt-link
          v-if="!isAuthenticated"
          to="/auth/sign-in"
          class="btn btn-outline-primary btn-lg"
        >
          Sign in
        </nuxt-link>
        <nuxt-link
          v-if="isAuthenticated"
          to="/home"
          class="btn btn-outline-primary btn-lg"
        >
          Home
        </nuxt-link>
        <nuxt-link
          v-if="isAuthenticated"
          to="/auth/sign-off"
          class="btn btn-outline-primary btn-lg"
        >
          Sign off
        </nuxt-link>
      </div>
    </div>
  </section>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  computed: mapGetters(['isAuthenticated'])
}
</script>

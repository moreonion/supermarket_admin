<template>
  <b-navbar toggleable="sm" type="light" variant="light">
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse is-nav id="nav-collapse">
        <b-navbar-nav>
          <li class="nav-item"><nuxt-link class="nav-link" to="/" exact>Index</nuxt-link></li>
          <li class="nav-item" v-if="isAuthenticated">
            <nuxt-link class="nav-link" to="/home">Home</nuxt-link>
          </li>
          <li class="nav-item" v-if="isAuthenticated">
            <nuxt-link class="nav-link" to="/labels">Labels</nuxt-link>
          </li>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <li class="nav-item" v-if="!isAuthenticated">
            <nuxt-link class="nav-link" to="/auth/sign-in">Sign in</nuxt-link>
          </li>
          <li class="nav-item" v-else>
            <nuxt-link class="nav-link" to="/auth/sign-off">Sign off</nuxt-link>
          </li>
        </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: mapGetters(['isAuthenticated'])
}
</script>

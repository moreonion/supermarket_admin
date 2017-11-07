<template>
  <section class="container">
    <div>
      <h1 class="title">
        supermarket-admin
      </h1>
      <p>Log In with Auth0's Lock Widget.</p>
      <button @click="login()">Log In</button>
    </div>
  </section>
</template>

<script>
import { createWebAuth } from '~/utils/auth'

export default {
  methods: {
    login () {
      // redirect to authentication page of Auth0
      let webAuth = createWebAuth()
      webAuth.authorize()
    }
  }
}
</script>

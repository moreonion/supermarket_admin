<template>
  <section class="container-centered">
    <div>
      <h1 class="title">
        Sign in
      </h1>
      <button
        class="btn btn-outline-primary btn-lg"
        @click="loginRedirect()"
      >
        Sign in via Auth0..
      </button>
    </div>
  </section>
</template>

<script>
import { loginRedirect } from '~/utils/auth'

export default {
  middleware: 'anonymous',
  methods: {
    loginRedirect
  }
}
</script>

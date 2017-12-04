<template>
  <div>
    <the-nav-bar/>
    <nuxt/>
  </div>
</template>

<script>
import TheNavBar from '~/components/TheNavBar'

export default {
  components: {
    TheNavBar
  }
}
</script>

<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
}

.container-centered {
  min-height: 33vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

h1, h2, h3 {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  color: #526488;
  letter-spacing: 1px;
  margin-top: 1.75rem;
  margin-bottom: 1.25rem;
}
.big-title {
  color: #35495e;
  font-size: 8rem;
}
.title {
  font-size: 4rem;
}

.subtitle {
  font-size: 2rem;
  word-spacing: 5px;
}
</style>

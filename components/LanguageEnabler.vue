<template>
  <b-button-group size="sm">
    <b-button v-for="lang in allLanguages" @click="toggleLanguage(lang)" :pressed="isEnabledLanguage(lang)" :key="lang">
      {{ lang }}
    </b-button>
  </b-button-group>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: mapGetters(['allLanguages', 'allEnabledLanguages']),
  methods: {
    ...mapActions(['enableLanguage', 'disableLanguage']),
    isEnabledLanguage (lang) {
      return this.allEnabledLanguages.indexOf(lang) === -1 ? false : true // eslint-disable-line no-unneeded-ternary
    },
    toggleLanguage (lang) {
      this.isEnabledLanguage(lang) ? this.disableLanguage(lang) : this.enableLanguage(lang)
    }
  }
}
</script>

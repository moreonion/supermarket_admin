<template>
  <b-button-group size="sm">
    <b-button v-for="lang in orderedLanguages" @click="toggleLanguage(lang)" :pressed="isEnabledLanguage(lang)" :key="lang">
      {{ lang }}
    </b-button>
  </b-button-group>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: mapGetters({
    isEnabledLanguage: 'languages/isEnabledLanguage',
    orderedLanguages: 'languages/orderedLanguages',
    enabledLanguages: 'languages/enabledLanguages'
  }),
  methods: {
    ...mapActions({
      toggleLanguage: 'languages/toggleLanguage'
    })
  }
}
</script>

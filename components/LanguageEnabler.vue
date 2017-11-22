<template>
  <div>
    <b-form-checkbox v-for="lang in orderedLanguages" @input="toggleLanguage(lang)" :checked="isEnabledLanguage(lang)" :key="lang">
      {{ lang }}
    </b-form-checkbox>
  </div>
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

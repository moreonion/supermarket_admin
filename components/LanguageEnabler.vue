<!--
TODOs

* could be store-agnostic, i.e. do not read languages from vuex, but inject
  them via props
* create a container component around this component for the getter/setter
  logic
-->
<template>
  <div>
    <b-form-checkbox
      v-for="lang in orderedLanguages"
      @input="toggleLanguage(lang)"
      :checked="isEnabledLanguage(lang)"
      :key="lang"
    >
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

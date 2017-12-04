<template>
  <div>
    <div
      v-for="lang in enabledLanguages"
      :key="lang"
    >
      <template v-if="hasTranslation(lang)">
        <span v-if="includeLabel" class="badge badge-secondary mr-1">{{ lang }}</span>
        {{ extractTranslation(lang) }}
      </template>
      <template v-else-if="!hasTranslation(lang) && displayMissing">
        <span v-if="includeLabel" class="badge badge-secondary mr-1">{{ lang }}</span>
        <span class="font-italic">missing</span>
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    // an object with translation strings, keyed by the lang key
    translations: {
      type: Object,
      required: true
    },
    // display an "missing" string, when not translated
    displayMissing: {
      type: Boolean,
      default: false
    },
    // include the lang key as prefix badge
    includeLabel: {
      type: Boolean,
      default: false
    }
  },
  computed: mapGetters({
    enabledLanguages: 'languages/enabledLanguages'
  }),
  methods: {
    hasTranslation (lang) {
      return typeof this.extractTranslation(lang) === 'undefined' ? false : true // eslint-disable-line no-unneeded-ternary
    },
    extractTranslation (lang) {
      return this.translations[lang]
    }
  }
}
</script>

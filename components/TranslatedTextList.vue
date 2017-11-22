<template>
  <div>
    <div v-for="lang in enabledLanguages" :key="lang">
      <template v-if="hasTranslation(lang)">
        <span v-if="includeLabel" class="badge badge-secondary mr-1">{{ lang }}</span>
        {{ extractTranslation(lang).join(', ') }}
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
import forOwn from 'lodash.forown'
import ObjectPath from 'object-path'

export default {
  props: {
    // an object with translation strings, keyed by the lang key
    translationList: {
      type: Array,
      required: true
    },
    // the key to resolve the translation object
    translationKey: {
      type: String,
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
  computed: {
    ...mapGetters({
      enabledLanguages: 'languages/enabledLanguages'
    }),
    mappedTranslations () {
      return this.translationList.reduce((acc, item) => { // list
        forOwn(item, (value, field) => { // field
          forOwn(value, (translation, lang) => { // lang
            ObjectPath.push(acc, [lang, field], translation)
          })
        })
        return acc
      }, {})
    }
  },
  methods: {
    hasTranslation (lang) {
      return typeof this.extractTranslation(lang) === 'undefined' ? false : true // eslint-disable-line no-unneeded-ternary
    },
    extractTranslation (lang) {
      return ObjectPath.get(this.mappedTranslations, [lang, this.translationKey])
    }
  }
}
</script>

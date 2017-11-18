<template>
  <div>
    <b-form-checkbox v-for="name in allTableColumnsOrdered" :key="name"
                     :id="`checkbox-${name}`"
                     :checked="isEnabledTableColumn(name)"
                     @input="toggleTableColumn(name)">
      {{ name }}
    </b-form-checkbox>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: mapGetters({
    allTableColumnsOrdered: 'labels/allLabelColumns',
    allTableColumnsStates: 'labels/allLabelColumnStates'
  }),
  methods: {
    ...mapActions({
      enableTableColumn: 'labels/enableLabelTableColumn',
      disableTableColumn: 'labels/disableLabelTableColumn'
    }),
    isEnabledTableColumn (name) {
      return this.allTableColumnsStates[name].state
    },
    toggleTableColumn (name) {
      console.log(name)
      this.isEnabledTableColumn(name) ? this.disableTableColumn(name) : this.enableTableColumn(name)
    }
  }
}
</script>

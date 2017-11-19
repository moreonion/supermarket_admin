<template>
  <div>
    <b-form-checkbox v-for="name in orderedColumns" :key="name"
                     :id="`checkbox-${name}`"
                     :checked="isEnabledColumn(name)"
                     @input="toggleColumn(name)">
      {{ name }}
    </b-form-checkbox>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: mapGetters({
    orderedColumns: 'labels/columns',
    columnStates: 'labels/columnStates'
  }),
  methods: {
    ...mapActions({
      enableColumn: 'labels/enableColumn',
      disableColumn: 'labels/disableColumn'
    }),
    isEnabledColumn (name) {
      return this.columnStates[name].state
    },
    toggleColumn (name) {
      this.isEnabledColumn(name) ? this.disableColumn(name) : this.enableColumn(name)
    }
  }
}
</script>

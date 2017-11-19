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
    isEnabledColumn: 'labels/isEnabledColumn',
    orderedColumns: 'labels/orderedColumns',
    columnStates: 'labels/columnStates'
  }),
  methods: mapActions({
    toggleColumn: 'labels/toggleColumn'
  })
}
</script>

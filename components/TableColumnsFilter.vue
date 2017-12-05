<template>
  <div>
    <b-form-checkbox
      v-for="column in columns"
      :key="column.name"
      :id="`checkbox-${column.name}`"
      :checked="column.state"
      @input="toggleColumn(column.name)"
    >
      {{ column.name }}
    </b-form-checkbox>
  </div>
</template>

<script>
export default {
  props: {
    // ordered array of columns to configure
    // expects e.g.: { name: "columnname", state: true }
    columns: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    toggleColumn (name) {
      this.$emit('toggle', name)
    }
  }
}
</script>

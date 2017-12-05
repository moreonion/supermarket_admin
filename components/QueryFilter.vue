<template>
  <div>
    <div class="btn-group mb-3">
      <b-btn class="btn btn-outline-primary" @click="addFilter">Add filter</b-btn>
      <b-btn class="btn btn-outline-primary" @click="applyFilters">Apply</b-btn>
    </div>
    <div class="">
      <div
        v-for="(filter, filterIndex) in localFilters"
        :key="filterIndex"
        class="form-row"
      >
        <b-form-group class="col-md-4">
          <b-form-select
            v-model="filter.field"
            :options="fieldOptions">
          </b-form-select>
        </b-form-group>
        <b-form-group class="col-md-3">
          <b-form-select
            v-model="filter.operator"
            :options="operators"
            class="col-md-4">
          </b-form-select>
        </b-form-group>
        <b-form-group class="col-md-4">
          <b-form-input
            v-model="filter.value"
            type="text"
          ></b-form-input>
        </b-form-group>
        <b-form-group class="col-md-1">
          <button
            type="button"
            class="close"
            aria-label="Close"
            @click="removeFilter(filterIndex)"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </b-form-group>
      </div>
    </div>
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
    },
    // allowed operators the api understands
    operators: {
      type: Array,
      default: () => []
    },
    // filters use the MongoDB-style query document format
    filters: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      // deep copy the prop on initialization, as we want to *bubble* the new
      // filters so that the parent component can deal with it saving the new
      // filters in the store
      localFilters: JSON.parse(JSON.stringify(this.filters))
    }
  },
  computed: {
    // generate an array of options for the <b-form-select> component
    fieldOptions () {
      return this.columns.map((column) => {
        return { value: `${column.name}`, text: `${column.name}` }
      })
    }
  },
  methods: {
    // order does not matter
    // all filters will be connected with AND
    addFilter () {
      this.localFilters.push({})
    },
    removeFilter (index) {
      this.localFilters.splice(index, 1)
    },
    applyFilters () {
      this.$emit('apply', JSON.parse(JSON.stringify(this.localFilters)))
    }
  }
}
</script>

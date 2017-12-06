<!--
TODOs

* adapt the filter fields to display different components for different types,
  e.g. use a range input or a url input
  this could enable basic validation
* map the operators to better labels ("greater than" instead of "$gt")
* deal with "$in" operator, which could be a list
* autocomplete
-->
<template>
  <div>
    <div class="btn-group mb-3">
      <b-btn class="btn btn-outline-primary" @click="addFilter">Add filter</b-btn>
      <b-btn class="btn btn-outline-primary" @click="resetFilters">Reset</b-btn>
      <b-btn class="btn btn-outline-primary" @click="applyFilters">Apply</b-btn>
    </div>
    <div class="">
      <div
        v-for="(filter, filterIndex) in localFilters"
        :key="filterIndex"
        class="form-row"
      >
        <b-form-group class="col-md-3">
          <b-form-select
            v-model="filter.field"
            :options="fieldOptions">
          </b-form-select>
        </b-form-group>
        <b-form-group class="col-md-2">
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
        <b-form-group class="col-md-2">
          <b-form-select
            v-model="filter.language"
            :options="languagesOptions">
          </b-form-select>
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
    },
    // array of languages for filters
    languages: {
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
    },
    // array of select options for use with translated fields
    languagesOptions () {
      return this.languages
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
    // reset to empty array and emit an apply
    resetFilters () {
      this.localFilters = []
      this.applyFilters()
    },
    // emit the list of filters to the parent
    // the parent has to deal with persistence, calling the API, ...
    applyFilters () {
      this.$emit('apply', JSON.parse(JSON.stringify(this.localFilters)))
    }
  }
}
</script>

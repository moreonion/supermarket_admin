<template>
  <section class="container">
    <div>
      <h1 class="title">
        Labels
      </h1>

      <div class="row mb-3">
        <div class="col-sm-6">
          <div class="btn-group">
            <b-btn class="btn btn-outline-primary" v-b-modal.label-form>New</b-btn>
            <b-btn class="btn btn-outline-primary" v-b-modal.label-filter>Filter</b-btn>
          </div>
        </div>

        <div class="col-sm-6 text-right">
          <language-enabler/>
        </div>
      </div>

      <b-pagination-nav
        size="md"
        use-route
        :link-gen="linkGen"
        :number-of-pages="itemsPages"
        v-model="currentPage"
      ></b-pagination-nav>

      <table class="table">
        <thead>
          <tr>
            <th
              v-for="column in allEnabledLabelColumns"
              :key="column"
              scope="col"
            >
              {{ column }}
            </th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="label in allLabels" :key="label">
            <td v-for="column in allEnabledLabelColumns" :key="column">
              <div v-if="column === 'name'">
                <translated-text
                  include-label
                  display-missing
                  :translations="getValueFor(allLabelStates[label], column)"
                />
              </div>
              <div v-else-if="['hotspots', 'resources'].includes(column)">
                <translated-text-list
                  include-label
                  display-missing
                  translation-key="name"
                  :translation-list="getValueFor(allLabelStates[label], column)"
                />
              </div>
              <div v-else>
                {{ getValueFor(allLabelStates[label], column) }}
              </div>
            </td>
            <td>
              <b-btn
                size="sm"
                variant="outline-primary"
                @click="showEditModal(label)"
              >
                Edit
              </b-btn>
            </td>
          </tr>
        </tbody>
      </table>

      <b-modal ref="labelFormModal" id="label-form" title="New Label" size="lg" hide-footer>
        <p class="mb-2">Create a new label</p>

        <b-form @submit.prevent="onSubmit" novalidate>
          <b-tabs>
            <b-tab title="Label" active>
              <b-form-group
                id="group-name"
                description="The name of the label"
                label="Label name"
              >
                <div
                  v-for="lang in enabledLanguages"
                  :key="lang"
                  class="input-group mb-2"
                >
                  <span class="input-group-addon">{{ lang }}</span>
                  <b-form-input
                    :id="`label-name-${lang}`"
                    v-model="form.name[lang]"
                    type="text"
                    placeholder="Label name"
                    required
                  ></b-form-input>
                </div>
              </b-form-group>
              <b-form-group
                id="group-type"
                description="The label type."
                label="Label type"
              >
                <b-form-select
                  id="label-type"
                  v-model="form.type"
                  :options="spec.type.options"
                  type="text"
                  placeholder="Logo URL"
                  required
                  class="mb-2"
                ></b-form-select>
              </b-form-group>
              <b-form-group
                id="group-logo"
                description="A URL to a logo for the label."
                label="Logo URL"
              >
                <div
                  v-for="lang in enabledLanguages"
                  :key="lang"
                  class="input-group mb-2"
                >
                  <span class="input-group-addon">{{ lang }}</span>
                  <b-form-input
                    :id="`label-logo-${lang}`"
                    v-model="form.logo[lang]"
                    type="url"
                    placeholder="Logo URL"
                  ></b-form-input>
                </div>
              </b-form-group>
              <b-form-group
                id="group-description"
                description="A description for the label."
                label="Description"
              >
                <div
                  v-for="lang in enabledLanguages"
                  :key="lang"
                  class="input-group mb-2"
                >
                  <span class="input-group-addon">{{ lang }}</span>
                  <b-form-textarea
                    id="`label-description-${lang}`"
                    v-model="form.description[lang]"
                    type="text"
                    placeholder="Description"
                    rows="3"
                  ></b-form-textarea>
                </div>
              </b-form-group>
            </b-tab>
            <b-tab title="Criteria">
              <b-form-group
                id="group-criteria"
                description="Criteria associated with the label."
                label="Criteria"
              >
                <div
                  v-for="criterion in criterionOptions"
                  id="label-criteria"
                  :key="criterion.value"
                >
                  <b-form-checkbox v-model="enabled_criteria" :value="criterion.value">
                    {{ criterion.text }}
                  </b-form-checkbox>
                  <div class="ml-4">
                    <div class="input-group mb-2" v-for="lang in enabledLanguages" :key="lang">
                      <span class="input-group-addon">{{ lang }}</span>
                      <b-form-input
                        :id="`label-criterion-${criterion.value}-explanation-${lang}`"
                        :value="getExplanation(criterion.value, lang)"
                        @input="value => { setExplanation(value, criterion.value, lang) }"
                        type="text"
                        placeholder="Explanation"
                      ></b-form-input>
                    </div>
                  </div>
                  <div
                    v-for="measure in getPossibleMeasureForCriterion(criterion.value)"
                    :key="measure.value"
                    class="ml-4"
                  >
                    <b-form-checkbox
                      v-model="enabled_criteria_measures[criterion.value]"
                      :value="measure.value"
                    >
                      {{ measure.text }} (<span class="badge badge-light">{{ measure.value }}</span>)
                    </b-form-checkbox>
                  </div>
                </div>
              </b-form-group>
            </b-tab>
          </b-tabs>

          <div class="my-3">
            <b-btn
              type="submit"
              size="lg"
              variant="primary"
              class="ml-2 float-right"
            >
              Submit
            </b-btn>
            <b-btn
              type="reset"
              size="lg"
              variant="secondary"
              class="ml-2 float-right"
              @click="resetFormData"
            >
              Reset
            </b-btn>
            <b-btn
              size="lg"
              class="ml-2 float-right"
              variant="secondary"
              @click="show=false"
            >
              Close
            </b-btn>
          </div>
        </b-form>
      </b-modal>

      <b-modal
        id="label-filter"
        ref="labelFilterModal"
        title="Filter label columns"
        size="lg"
      >
        <table-columns-filter
          :columns="localColumnStates"
          @toggle="toggleColumn"
        />
      </b-modal>
    </div>
  </section>
</template>

<script>
// for access resolving strings to objects paths
import ObjectPath from 'object-path'

import { mapGetters, mapActions } from 'vuex'

// config
import LabelApiMappings from '~/config/labels'

import { NotificationMixin } from '~/mixins/notifications'
import LanguageEnabler from '~/components/LanguageEnabler'
import TableColumnsFilter from '~/components/TableColumnsFilter'
import TranslatedText from '~/components/TranslatedText'
import TranslatedTextList from '~/components/TranslatedTextList'

// copy with `JSON.parse(JSON.stringify(defaultFormData))`
// to prevent setting references to this "immutable" object
//
// mirros the JSON the API is expecting
const defaultFormData = {
  name: {}, // translated
  type: 'product', // default
  logo: {}, // translated
  description: {}, // translated
  meets_criteria: [] // objects {'criterion': id, 'score': measure_id, 'explanation': translated string }
}

export default {
  mixins: [ NotificationMixin ],
  components: {
    LanguageEnabler,
    TableColumnsFilter,
    TranslatedText,
    TranslatedTextList
  },
  middleware: 'authenticated',
  data () {
    return {
      currentPage: 1,
      itemsPages: 1,
      itemsPageLimit: 10,
      currentAction: 'create', // or 'edit'
      currentFormId: null, // or an ID of a label being edited
      editableFields: ['name', 'description', 'logo', 'type', 'meets_criteria'],
      // decoupled storage because we want to retain state when parent gets disabled
      // this is relevant for: enabled_criteria, enabled_criteria_measures,
      // enabled_criteria_measures_explanations
      enabled_criteria: [], // list
      enabled_criteria_measures: {}, // map id -> id
      enabled_criteria_measures_explanations: {}, // map id -> id -> string
      spec: {
        type: {
          options: [
            { value: 'product', text: 'Product' },
            { value: 'retailer', text: 'Retailer' }
          ]
        }
      },
      form: {
        ...JSON.parse(JSON.stringify(defaultFormData))
      }
    }
  },
  computed: {
    ...mapGetters({
      accessToken: 'accessToken',
      enabledLanguages: 'languages/enabledLanguages',
      allLabels: 'labels/labels',
      allLabelStates: 'labels/labelStates',
      orderedColumns: 'labels/orderedColumns',
      allColumnStates: 'labels/columnStates',
      allEnabledLabelColumns: 'labels/enabledColumns',
      allCriteria: 'criteria/criteria',
      allCriteriaStates: 'criteria/criteriaStates'
    }),
    // prepare data for table filter
    localColumnStates () {
      return this.orderedColumns.map((name) => {
        return { name: name, state: this.allColumnStates[name].state }
      })
    },
    criterionOptions () {
      return this.allCriteria.map((criterionId) => {
        return { value: `${criterionId}`, text: this.allCriteriaStates[criterionId]['name'] }
      })
    },
    criterionMeasuresMap () {
      return this.allCriteria.reduce((acc, criterionId) => {
        const keys = Object.keys(this.allCriteriaStates[criterionId].details.measures)
        acc[criterionId] = keys.map((key) => {
          return { value: key, text: this.allCriteriaStates[criterionId].details.measures[key] }
        })
        return acc
      }, {})
    }
  },
  mounted () {
    // read page num from route if given
    if (this.$route.query.page) {
      this.currentPage = parseInt(this.$route.query.page)
    }

    this.fetchLabels(this.currentPage)
  },
  methods: {
    ...mapActions({
      setLabels: 'labels/setLabels',
      toggleColumn: 'labels/toggleColumn',
      setCriteria: 'criteria/setCriteria'
    }),
    getExplanation (criterionId, lang) {
      return ObjectPath.get(this.enabled_criteria_measures_explanations, [criterionId, lang], null)
    },
    setExplanation (value, criterionId, lang) {
      ObjectPath.ensureExists(this.enabled_criteria_measures_explanations, [criterionId], {})
      this.$set(this.enabled_criteria_measures_explanations[criterionId], lang, value)
    },
    /**
     * generate links for <b-pagination-nav>
     */
    linkGen (pageNum) {
      return { path: '', query: { page: pageNum } }
    },
    getValueFor (label, name) {
      const valuePath = LabelApiMappings.columnValueMap[name]
      return ObjectPath.get(label, valuePath)
    },
    getPossibleMeasureForCriterion (criterionId) {
      return this.criterionMeasuresMap[criterionId]
    },
    // return a data object to be consumable by the API
    buildApiData () {
      return Object.assign({}, this.form, {
        meets_criteria: this.buildMeetsCriteriaMap()
      })
    },
    // only set the keys which have values
    // returns a list with criteria met
    // can be used as `meets_criteria` array
    buildMeetsCriteriaMap () {
      return this.enabled_criteria.map((item) => {
        const criteria = {
          'criterion': item
        }
        if (this.enabled_criteria_measures[item]) {
          criteria['score'] = this.enabled_criteria_measures[item]
        }
        if (this.enabled_criteria_measures_explanations[item]) {
          criteria['explanation'] = this.enabled_criteria_measures_explanations[item]
        }

        return criteria
      })
    },
    // need using `this.$set()` for newly read properties
    initializeMeetsCriteriaMap () {
      this.form.meets_criteria.map((item) => {
        const criterionId = item.criterion
        this.enabled_criteria.push(criterionId)
        if (item.score) {
          this.$set(this.enabled_criteria_measures, criterionId, `${item.score}`)
        }
        if (item.explanation) {
          this.$set(this.enabled_criteria_measures_explanations, criterionId, item.explanation)
        }
      })
    },
    fetchCriteria (pageNum = 1) {
      this.$supermarket.query('criteria',
        {
          params: {
            limit: 100,
            page: pageNum,
            sort: 'id',
            lang: 'en' // only 'en' for now
          }
        },
        [], // projections
        {}, // filters
        {
          fetchFullModel: true
        }
      ).then((resp) => {
        console.log(`success: fetching critiria page ${pageNum}`)
        this.showFetchSuccess()
        this.setCriteria(resp.data.items)
      }).catch((err) => {
        console.log(err.response)
        this.showFetchError(err)
      })
    },
    /*
     * call the API for some labels, then let the store action `setLabels` deal
     * with reducing the response and storing the items
     */
    fetchLabels (pageNum = 1) {
      // preload criteria
      this.fetchCriteria()

      this.$supermarket.query('labels',
        {
          params: {
            limit: this.itemsPageLimit,
            page: pageNum,
            sort: 'id'
          }
        },
        this.allEnabledLabelColumns, // projections
        {}, // filters
        {
          fetchFullModel: true
        }
      ).then((resp) => {
        console.log(`success: fetching labels page ${pageNum}`)
        this.showFetchSuccess()

        this.currentPage = parseInt(resp.data.pages.current)
        this.itemsPages = parseInt(resp.data.pages.total)
        this.setLabels(resp.data.items)
      }).catch((err) => {
        console.log(err.response)
        this.showFetchError(err)
      })
    },
    resetFormData (newLabel) {
      console.log(defaultFormData)
      this.form = JSON.parse(JSON.stringify(defaultFormData))
      this.enabled_criteria = []
      this.enabled_criteria_measures = {}
      this.enabled_criteria_measures_explanations = {}
    },
    postNewLabel (newLabel) {
      this.$supermarket.setAuth(this.accessToken)

      this.$supermarket.create('labels', newLabel).then((resp) => {
        this.showCreateSuccess()
      }).catch((err) => {
        console.log(err.response)
        this.showCreateError(err)
      })
    },
    putLabel (editedLabel, labelId) {
      this.$supermarket.setAuth(this.accessToken)

      this.$supermarket.update('labels', labelId, editedLabel).then((resp) => {
        this.showCreateSuccess()
      }).catch((err) => {
        console.log(err.response)
        this.showCreateError(err)
      })
    },
    /*
     * get a full label from the store
     * (for now no not found handling, we assume we have fetched it)
     */
    getLabel (id) {
      return this.allLabelStates[id]
    },
    /*
     * we only want to edit some of the properties we get from the API
     * e.g. not the references for now, so we want to operate on a
     * filtered down form object we can PUT on the server later
     */
    getFilteredLabel (id) {
      const label = this.getLabel(id)

      const filtered = Object.keys(label)
        .filter(key => this.editableFields.includes(key))
        .reduce((obj, key) => {
          obj[key] = label[key]
          return obj
        }, {})

      return filtered
    },
    /*
     * setup the the form property and editing state
     * then open the modal
     */
    showEditModal (id) {
      this.form = JSON.parse(JSON.stringify(this.getFilteredLabel(id)))
      this.initializeMeetsCriteriaMap()
      this.currentAction = 'edit'
      this.currentFormId = id
      this.showModal()
    },
    showModal () {
      this.$refs.labelFormModal.show()
    },
    hideModal () {
      this.$refs.labelFormModal.hide()
    },
    /*
     * depending on the editing state, we want to POST a new label
     * or PUT an edited own on the server
     */
    onSubmit (ev) {
      // add class `was-validated` for custom BS4 validations to work
      ev.target.classList.add('was-validated')

      const data = this.buildApiData()

      console.log(JSON.stringify(data))

      if (ev.target.checkValidity()) {
        console.log('valid form')

        if (this.currentAction === 'edit') {
          this.putLabel(data, this.currentFormId)
        } else {
          this.postNewLabel(data)
        }

        // reset state
        this.currentAction = 'create'
        this.currentFormId = null
        this.resetFormData()
        this.hideModal()
      } else {
        console.log('invalid form')
      }
    }
  }
}
</script>

<style scoped>
.input-group-addon {
  align-items: baseline;
}
</style>

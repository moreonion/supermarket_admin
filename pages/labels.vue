<template>
  <section class="container">
    <div>
      <h1 class="title">
        Labels
      </h1>

      <div class="container mb-3">
        <div class="btn-group">
          <b-btn class="btn btn-outline-primary" v-b-modal.label-form>New</b-btn>
          <b-btn class="btn btn-outline-primary" v-b-modal.label-filter>Filter</b-btn>
        </div>
      </div>

      <b-pagination-nav size="md" use-route :link-gen="linkGen" :number-of-pages="itemsPages" v-model="currentPage">
      </b-pagination-nav>

      <table class="table">
        <thead>
          <tr>
            <th v-for="column in allEnabledLabelColumns" scope="col" :key="column">{{ column }}</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="label in allLabels" :key="label">
            <td v-for="column in allEnabledLabelColumns">{{ getValueFor(allLabelStates[label], column) }}</td>
            <td><b-btn size="sm" variant="outline-primary" @click="showEditModal(label)">Edit</b-btn></td>
          </tr>
        </tbody>
      </table>

      <b-modal ref="labelFormModal" id="label-form" title="New Label" size="lg" hide-footer>
        <p class="mb-2">Create a new label</p>

        <div class="container mb-3 text-right">
          <language-enabler/>
        </div>

        <b-form @submit.prevent="onSubmit" novalidate>
          <b-form-group id="group-name"
                        description="The name of the label"
                        label="Label name"
          >
            <div class="input-group mb-2" v-for="lang in allEnabledLanguages" :key="lang">
              <span class="input-group-addon">{{ lang }}</span>
              <b-form-input
                            :id="`label-name-${lang}`"
                            type="text" v-model="form.name[lang]" required
                            placeholder="Label name"
              ></b-form-input>
            </div>
          </b-form-group>
          <b-form-group id="group-type"
                        description="The label type."
                        label="Label type"
          >
            <b-form-select id="label-type" class="mb-2"
                           type="text" v-model="form.type" required
                           :options="spec.type.options"
                           placeholder="Logo URL"
            ></b-form-select>
          </b-form-group>
          <b-form-group id="group-logo"
                        description="A URL to a logo for the label."
                        label="Logo URL"
          >
            <div class="input-group mb-2" v-for="lang in allEnabledLanguages" :key="lang">
              <span class="input-group-addon">{{ lang }}</span>
              <b-form-input :id="`label-logo-${lang}`"
                            type="url" v-model="form.logo[lang]"
                            placeholder="Logo URL"
              ></b-form-input>
            </div>
          </b-form-group>
          <b-form-group id="group-description"
                        description="A description for the label."
                        label="Description"
          >
            <div class="input-group mb-2" v-for="lang in allEnabledLanguages" :key="lang">
              <span class="input-group-addon">{{ lang }}</span>
              <b-form-textarea id="`label-description-${lang}`"
                               type="text" v-model="form.description[lang]"
                               placeholder="Description"
                               rows="3"
              ></b-form-textarea>
            </div>
          </b-form-group>

          <div class="my-3">
            <b-btn type="submit" size="lg" class="ml-2 float-right" variant="primary">Submit</b-btn>
            <b-btn type="reset" size="lg" class="ml-2 float-right" variant="secondary" @click="resetFormData">Reset</b-btn>
            <b-btn size="lg" class="ml-2 float-right" variant="secondary" @click="show=false">Close</b-btn>
          </div>
        </b-form>
      </b-modal>

      <b-modal ref="labelFilterModal" id="label-filter" title="Filter label columns" size="lg">
        <table-columns-filter/>
      </b-modal>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import LanguageEnabler from '~/components/LanguageEnabler'
import TableColumnsFilter from '~/components/TableColumnsFilter'
import { t, NotificationMixin } from '~/utils/utils'
import LabelApiMappings from '~/config/labels'

// for access resolving strings to objects paths
import ObjectPath from 'object-path'

// copy with `JSON.parse(JSON.stringify(defaultFormData))`
// to prevent setting references to this "immutable" object
const defaultFormData = {
  name: {}, // translated
  type: 'product', // default
  logo: {}, // translated
  description: {} // translated
}

export default {
  mixins: [ NotificationMixin ],
  components: {
    LanguageEnabler,
    TableColumnsFilter
  },
  middleware: 'authenticated',
  computed: mapGetters({
    accessToken: 'accessToken',
    allLabels: 'labels/allLabels',
    allLabelStates: 'labels/allLabelStates',
    allEnabledLanguages: 'languages/allEnabledLanguages',
    allEnabledLabelColumns: 'labels/allEnabledLabelColumns'
  }),
  data () {
    return {
      currentPage: 1,
      itemsPages: 1,
      itemsPageLimit: 10,
      currentAction: 'create', // or 'edit'
      currentFormId: null, // or an ID of a label being edited
      editableFields: ['name', 'description', 'logo', 'type'],
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
  mounted () {
    // read page num from route if given
    if (this.$route.query.page) {
      this.currentPage = parseInt(this.$route.query.page)
    }

    this.fetchLabels(this.currentPage)
  },
  methods: {
    ...mapActions({
      setLabels: 'labels/setLabels'
    }),
    /**
     * generate links for <b-pagination-nav>
     */
    linkGen (pageNum) {
      return { path: '', query: { page: pageNum } }
    },
    t,
    getValueFor (label, name) {
      const valuePath = LabelApiMappings.columnValueMap[name]
      return ObjectPath.get(label, valuePath)
    },
    /*
     * call the API for some labels, then let the store action `setLabels` deal
     * with reducing the response and storing the items
     */
    fetchLabels (pageNum = 1) {
      this.$axios.get(`/labels?limit=${this.itemsPageLimit}&page=${pageNum}&sort=id`)
        .then((resp) => {
          console.log(`success: fetching labels page ${pageNum}`)
          this.showFetchSuccess()

          this.currentPage = parseInt(resp.data.pages.current)
          this.itemsPages = parseInt(resp.data.pages.total)
          this.setLabels(resp.data.items)
        })
        .catch((err) => {
          console.log(err.response)
          this.showFetchError(err)
        })
    },
    resetFormData (newLabel) {
      console.log(defaultFormData)
      this.form = JSON.parse(JSON.stringify(defaultFormData))
    },
    postNewLabel (newLabel) {
      const authenticationHeader = { 'Authorization': `Bearer ${this.accessToken}` }
      this.$axios.post('/labels', newLabel, {
        headers: { ...authenticationHeader }
      })
        .then((resp) => {
          this.showCreateSuccess()
        })
        .catch((err) => {
          console.log(err.response)
          this.showCreateError(err)
        })
    },
    putLabel (editedLabel, labelId) {
      const authenticationHeader = { 'Authorization': `Bearer ${this.accessToken}` }
      this.$axios.put(`/labels/${labelId}`, editedLabel, {
        headers: { ...authenticationHeader }
      })
        .then((resp) => {
          this.showCreateSuccess()
        })
        .catch((err) => {
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

      console.log(JSON.stringify(this.form))

      if (ev.target.checkValidity()) {
        console.log('valid form')

        if (this.currentAction === 'edit') {
          this.putLabel(this.form, this.currentFormId)
        } else {
          this.postNewLabel(this.form)
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

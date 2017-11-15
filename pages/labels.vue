<template>
  <section class="container">
    <div>
      <h1 class="title">
        Labels
      </h1>

      <div class="container mb-3">
        <div class="btn-group">
          <b-btn class="btn btn-outline-primary" v-b-modal.label-form>New</b-btn>
        </div>
      </div>

      <table class="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="label in allLabels" :key="label.id">
            <td>{{ label.id }}</td>
            <td>{{ t(label.name) }}</td>
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
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import LanguageEnabler from '~/components/LanguageEnabler'
import { t, NotificationMixin } from '~/utils/utils'

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
    LanguageEnabler
  },
  middleware: 'authenticated',
  computed: mapGetters(['allLabels', 'allEnabledLanguages', 'accessToken']),
  data () {
    return {
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
    this.$axios.get('/labels')
      .then((resp) => {
        this.showFetchSuccess()
        this.$store.commit('SET_LABELS', resp.data.items)
      })
      .catch((err) => {
        console.log(err.response)
        this.showFetchError(err)
      })
  },
  methods: {
    t,
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
    hideModal () {
      this.$refs.labelFormModal.hide()
    },
    onSubmit (ev) {
      // add class `was-validated` for custom BS4 validations to work
      ev.target.classList.add('was-validated')

      console.log(JSON.stringify(this.form))

      if (ev.target.checkValidity()) {
        console.log('valid form')

        this.postNewLabel(this.form)

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

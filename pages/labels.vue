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

      <b-modal id="label-form" title="New Label" size="lg">
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
          <b-form-textarea id="label-details" class="mb-2"
                           type="text" v-model="form.details"
                           placeholder="Details"
                           rows="3"
          ></b-form-textarea>

          <div class="my-2">
            <b-button type="submit" variant="primary" class="ml-1 float-right">Submit</b-button>
            <b-button type="reset" variant="secondary" class="ml-1 float-right">Reset</b-button>
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
        name: {}, // translated
        type: 'product', // default
        logo: {}, // translated
        description: {}, // translated
        details: '' // JSON
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
    onSubmit (ev) {
      // add class `was-validated` for custom BS4 validations to work
      ev.target.classList.add('was-validated')
      console.log(JSON.stringify(this.form))
      if (ev.target.checkValidity()) {
        console.log('valid form')
        this.postNewLabel(this.form)
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

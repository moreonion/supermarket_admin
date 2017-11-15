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

        <b-form @submit.prevent="onSubmit" novalidate>
          <b-form-group id="group-name"
                        description="The name of the label"
                        label="Label name"
          >
            <b-form-input id="label-name" class="mb-2"
                          type="text" v-model.trim="form.name.de" required
                          placeholder="Label name"
            ></b-form-input>
          </b-form-group>
          <b-form-select id="label-type" class="mb-2"
                         type="text" v-model="form.type" required
                         :options="spec.type.options"
                         placeholder="Logo URL"
          ></b-form-select>
          <b-form-group id="group-logo"
                        description="A URL to a logo for the label."
                        label="Logo URL"
          >
            <b-form-input id="label-logo" class="mb-2"
                          type="url" v-model="form.logo.de"
                          placeholder="Logo URL"
            ></b-form-input>
          </b-form-group>
          <b-form-textarea id="label-description" class="mb-2"
                           type="text" v-model="form.description.de"
                           placeholder="Description"
                           rows="3"
          ></b-form-textarea>
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
import { t, NotificationMixin } from '~/utils/utils'

export default {
  mixins: [ NotificationMixin ],
  middleware: 'authenticated',
  computed: mapGetters(['allLabels']),
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
        name: {
          de: ''
        },
        type: 'product', // default
        logo: {
          de: ''
        },
        description: {
          de: ''
        },
        details: ''
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
      const token = window.localStorage.getItem('access_token')
      const authenticationHeader = { 'Authorization': `Bearer ${token}` }
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

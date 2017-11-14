<template>
  <section class="container">
    <div>
      <h1 class="title">
        Labels
      </h1>

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
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import { t } from '~/utils/utils'

export default {
  middleware: 'authenticated',
  computed: mapGetters(['allLabels']),
  mounted () {
    this.$axios.get('https://api.supplychainge.org/api/v1/labels')
      .then((resp) => {
        this.$store.commit('SET_LABELS', resp.data.items)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  methods: {
    t
  }
}
</script>

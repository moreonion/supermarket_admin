<template>
  <div class="products">
    <h1>Products</h1>
    <div v-if="loading" class="loading">
      Loading...
    </div>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <div v-if="products" class="content">
      <li v-for="product in products">
        {{ product.name }}
        <router-link :to="product.id + '/edit'" append>edit</router-link>
        <router-link :to="product.id + '/delete'" append>delete</router-link>
      </li>
    </div>

    <p><router-link :to="'add'" append>Add new product</router-link></p>
  </div>
</template>

<script>
export default {
  name: 'products',
  data () {
    return {
      loading: false,
      products: null,
      error: null
    }
  },
  created () {
    // fetch the data when the view is created and the data is
    // already being observed
    this.fetchData()
  },
  watch: {
    // call again the method if the route changes
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      this.error = this.products = null
      this.loading = true
      // fetch products
      this.$http.get('products').then(response => {
        // success callback
        this.loading = false
        if (response.body.length === 0) {
          this.error = 'No products found, please add one.'
        } else {
          this.products = response.body
        }
      }, response => {
        // error callback
        this.loading = false
        if (response.status === 0) {
          this.error = 'The database server can’t be reached.'
        } else {
          this.error = response.body.message
        }
      })
    }
  }
}
</script>

<template>
  <div class="products">
    <go-back>back</go-back>
    <h1>New product</h1>
    <div v-if="error" class="error">
      {{ error }}
    </div>
    <form>
      <label for="product-name">Name</label>
      <input id="product-name" v-model="product.name">
      <label for="product-gtin">GTIN</label>
      <input id="product-gtin" v-model="product.gtin">
      <button @click="postData">Add {{ product.name }}</button>
  </form>
  </div>
</template>

<script>
export default {
  name: 'products-add',
  data () {
    return {
      product: {
        name: '',
        gtin: ''
      },
      error: null
    }
  },
  methods: {
    postData () {
      this.error = null
      var resource = this.$resource('products')
      resource.save(this.product).then(response => {
        // success callback
        this.$router.push({name: 'Products'})
      }, response => {
        // error callback
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

<style scoped>
form {
  text-align: left;
  max-width: 15rem;
  margin-left: auto;
  margin-right: auto;
}
label, input {
  display: block;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
</style>

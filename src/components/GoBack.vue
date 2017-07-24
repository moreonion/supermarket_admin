<template>
  <button @click="goBack"><slot>go back</slot></button>
</template>

<script>
export default {
  name: 'go-back',
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<template>
  <p>Signing off...</p>
</template>

<script>
import { unsetToken } from '~/utils/auth'

export default {
  mounted () {
    unsetToken()
  }
}
</script>

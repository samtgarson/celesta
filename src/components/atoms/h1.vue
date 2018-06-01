<template>
  <p class="h1" v-bind="$attrs" v-on="$listeners">
    <slot />
  </p>
</template>

<script>
import P from './p'

export default {
  name: 'h1',
  components: { P }
}
</script>

<style lang="scss" scoped>
  label {
    font-size: 40;
  }
</style>

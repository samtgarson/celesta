<template>
  <StackLayout v-bind="$attrs" v-on="$listeners">
    <slot />
  </StackLayout>
</template>

<script>
export default {
  name: 'div'
}
</script>

<style scoped>
</style>

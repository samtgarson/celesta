<template>
  <StackLayout class="wrapper">
    <slot />
  </StackLayout>
</template>

<script>
export default {
  name: 'wrapper'
}
</script>

<style lang="scss" scoped>
@import '../../assets/vars';

.wrapper {
  background-color: $bg;
  padding: $small-margin;
}
</style>

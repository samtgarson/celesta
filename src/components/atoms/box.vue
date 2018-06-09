<template>
  <div class="box">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'box'
}
</script>

<style lang="scss" scoped>
@import '../../assets/vars';

.box {
  background-color: white;
  padding: $big-margin;
  border-radius: 5;
}
</style>

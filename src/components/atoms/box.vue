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
.box {
  background-color: white;
  padding: 27;
  border-radius: 5;
}
</style>

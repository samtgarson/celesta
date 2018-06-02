<template>
  <FlexboxLayout class="nav">
    <link
      tag="FlexboxLayout"
      :key="item" 
      flexGrow="1"
      v-for="item in items" 
      :route="item"
      class="item"
    >
      <icon namespace="nav" :name="item" />
    </link>
  </FlexboxLayout>
</template>

<script>

const items = [
  'home',
  'theory',
  'songs',
  'settings'
]

export default {
  data () { return { items } }
}
</script>

<style lang="scss" scoped>
.nav {
  height: 64;
  width: 100%;
  background-color: white;
}

.item {
  align-items: center;
  justify-content: space-around;
  opacity: 0.5;

  &.active {
    opacity: 1;
  }
}
</style>

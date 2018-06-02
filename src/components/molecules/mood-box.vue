<template>
  <div :class="['mood-box', 'white', colour, position]">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'MoodBox',
  data () {
    return { position: '' }
  },
  props: {
    colour: {
      type: String,
      validate: str => ['red', 'amber', 'green'].includes(str)
    }
  },
  mounted () {
    const index = this.$parent.$children.indexOf(this)
    const total = this.$parent.$children.length

    if (index === 0) this.position = 'first'
    if (index === total - 1) this.position = 'last'
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/vars';

.mood-box {
  margin-left: -27;
  margin-right: -27;
  padding: 27;
}

.first {
  margin-top: -27;
}

.last {
  margin-bottom: -27;
}

.red {
  background-color: $red;
}

.amber {
  background-color: $amber;
}

.green {
  background-color: $green;
}
</style>

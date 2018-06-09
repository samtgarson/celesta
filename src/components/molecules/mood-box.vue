<template>
  <div :class="['mood-box', 'white', colour, ...position]">
    <slot />
  </div>
</template>

<script>
import { GOOD, MEDIUM, BAD } from '@/assets/constants/moods'
import parentPosition from '@/assets/helpers/parent-position'

const colours = {
  [GOOD]: 'green',
  [MEDIUM]: 'amber',
  [BAD]: 'red'
}

export default {
  name: 'MoodBox',
  data () {
    return { position: [] }
  },
  props: {
    mood: {
      type: String,
      validate: str => [GOOD, MEDIUM, BAD].includes(str)
    }
  },
  computed: {
    colour () {
      return colours[this.mood]
    }
  },
  mounted () {
    this.position = parentPosition(this)
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/vars';

.mood-box {
  margin-left: -$big-margin;
  margin-right: -$big-margin;
  padding: $big-margin;
}

.first {
  margin-top: -$big-margin;
}

.last {
  margin-bottom: -$big-margin;
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

<template>
  <Image :src="src" stretch="none" marginBottom="20"/>
</template>

<script>
import { GOOD, MEDIUM, BAD } from '@/assets/constants/moods'

export default {
  props: {
    colour: {
      type: String,
      validate: s => ['blue', 'white'].includes(s)
    },
    mood: {
      type: String,
      validate: s => [GOOD, MEDIUM, BAD].includes(s)
    }
  },
  computed: {
    faceMood () {
      return {
        [GOOD]: 'happy',
        [MEDIUM]: 'middle',
        [BAD]: 'sad'
      }[this.mood]
    },
    src () {
      return `res://faces/${this.colour}/${this.faceMood}`
    }
  }
}
</script>

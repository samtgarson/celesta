<template>
  <Image :src="src" stretch="none" marginBottom="20"/>
</template>

<script>
export default {
  props: {
    colour: {
      type: String,
      validate: s => ['blue', 'white'].includes(s)
    },
    mood: {
      type: String,
      validate: s => ['happy', 'middle', 'sad'].includes(s)
    }
  },
  computed: {
    src () {
      return `res://faces/${this.colour}/${this.mood}`
    }
  }
}
</script>

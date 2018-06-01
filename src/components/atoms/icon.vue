<template>
  <Image v-on="$listeners" class="icon" :src="src" stretch="none"/>
</template>

<script>
export default {
  props: {
    colour: {
      type: String,
      validate: s => ['blue', 'white'].includes(s)
    },
    name: {
      type: String,
      required: true
    }
  },
  computed: {
    src () {
      return `res://icons/${this.colour}/${this.name}`
    }
  }
}
</script>


<template>
  <Image v-on="$listeners" class="icon" :src="src" stretch="none"/>
</template>

<script>
export default {
  props: {
    namespace: {
      type: String
    },
    name: {
      type: String,
      required: true
    }
  },
  computed: {
    src () {
      return `res://icons/${this.namespace}/${this.name}`
    }
  }
}
</script>


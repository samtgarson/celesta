<template>
  <div>
    <p>User: {{ $currentUser.uid }}</p>
    <p>{{ $store.getters['instruments/active'] }}</p>
  </div>
</template>
<script>
export default {
  mounted () {
    if (this.$store.getters['instruments/empty']) this.$router.push({ name: 'onboard' })
  }
}
</script>

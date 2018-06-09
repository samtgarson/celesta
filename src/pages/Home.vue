<template>
  <div>
    <home-summary />
    <wrapper>
      <box>
        <p>Hello!</p>
      </box>
    </wrapper>
  </div>
</template>
<script>
import HomeSummary from '../components/home-summary'

export default {
  components: { HomeSummary },
  lightNav: true,
  created () {
    if (this.$store.getters['instruments/empty']) this.$router.push({ name: 'onboard' })
  }
}
</script>

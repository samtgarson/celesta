<template>
  <wrapper top="0" left="0" width="100%" height="100%">
    <box>
      <face mood="happy" colour="blue" />
      <p class="faded">Welcome!</p>
      <p>Add your first instrument to get started.</p>
      <new-instrument @success="onSuccess"/>
    </box>
  </wrapper>
</template>
<script>
import Face from '../components/face'
import NewInstrument from '../components/new-instrument'

export default {
  components: { Face, NewInstrument },
  methods: {
    onSuccess () {
      this.$router.push({ name: 'home' })
    }
  }
}
</script>
<style lang="scss" scoped>
.mood-box {
  margin-top: 20;
}
</style>

<template>
  <Page :backgroundSpanUnderStatusBar="true" :actionBarHidden="true" class="page">
    <AbsoluteLayout>
      <StackLayout top="0" left="0" height="100%" width="100%" v-if="ready">
        <router-view ref="view"/>
      </StackLayout>
      <router-view name="modal" />
    </AbsoluteLayout>
  </Page>
</template>
<script>
export default {
  data () {
    return {
      ready: false
    }
  },
  mounted () {
    this.ready = true
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/vars';

.page {
  background-color: $bg;
}
</style>

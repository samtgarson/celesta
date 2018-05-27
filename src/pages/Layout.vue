<template>
  <Page :backgroundSpanUnderStatusBar="true" :actionBarHidden="true" ref="page">
    <AbsoluteLayout>
      <StackLayout top="0" left="0" height="100%" width="100%" v-if="ready">
        <router-view ref="view"/>
      </StackLayout>
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
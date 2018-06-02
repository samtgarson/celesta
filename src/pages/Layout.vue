<template>
  <Page :backgroundSpanUnderStatusBar="true" :actionBarHidden="true" class="page">
    <AbsoluteLayout v-if="ready">
      <FlexboxLayout flexDirection="column" top="0" left="0" height="100%" width="100%">
        <StackLayout flexGrow="1">
          <router-view ref="view"/>
        </StackLayout>
        <nav-bar flexGrow="0" />
      </FlexboxLayout>
      <router-view name="modal" />
    </AbsoluteLayout>
  </Page>
</template>
<script>
import NavBar from '../components/molecules/nav-bar'

export default {
  components: { NavBar },
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

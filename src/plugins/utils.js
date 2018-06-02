import Vue from 'nativescript-vue'

Vue.mixin({
  computed: {
    $currentUser () { return this.$store.state.user },
    nativeView () { return this.$el.nativeView }
  }
})

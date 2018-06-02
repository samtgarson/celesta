<template>
  <div class="select">
    <FlexboxLayout @tap="open = !open" class="input-wrapper">
      <p flexGrow="1">{{ label }}</p>
      <icon namespace="white" name="chevron-down" flexGrow="0" ref="arrow"/>
    </FlexboxLayout>
    <ListPicker @selectedIndexChange="choose" :originY="0" :class="['picker', { open }]" :items="labels" ref="picker" />
  </div>
</template>

<script>
import { AnimationCurve } from 'ui/enums'

const animationOpts = {
  duration: 200,
  curve: AnimationCurve.easeOut
}

export default {
  props: ['items'],
  data () {
    return {
      open: false,
      index: 0
    }
  },
  methods: {
    choose ({ value }) {
      this.index = value
    },
    openPicker () {
      this.$refs.arrow.nativeView.animate({ rotate: 180, ...animationOpts })
      this.$refs.picker.nativeView.animate({ scale: { x: 1, y: 1 }, opacity: 1, ...animationOpts })
    },
    closePicker () {
      this.$refs.arrow.nativeView.animate({ rotate: 0, ...animationOpts })
      this.$refs.picker.nativeView.animate({ scale: { x: 1, y: 0 }, opacity: 0, ...animationOpts })
    }
  },
  computed: {
    values () { return Object.keys(this.items) },
    labels () { return Object.values(this.items) },
    value () { return this.values[this.index] },
    label () { return this.labels[this.index] }
  },
  watch: {
    open (open) {
      if (open) this.openPicker()
      else this.closePicker()
    },
    value: {
      handler (value) {
        this.$emit('input', value)
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/vars';


.input-wrapper {
  border-bottom-width: 2;
  border-bottom-color: $body;
  width: 100%;


  .white & {
    border-bottom-color: white;
  }

  .p {
    margin-bottom: 2;
  }

  .icon {
    margin-top: 8
  }
}

.picker {
  font-size: $body-size;
  color: $body;
  height: 0;
  opacity: 0;
  
  &.open {
    height: 100;
  }

  .white & {
    color: white;
  }
}

</style>

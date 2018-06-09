<template>
  <Label :class="classes" v-on="$listeners" v-bind="$attrs" textWrap="true" ref="label">
    <slot />
  </Label>
</template>

<script>
import parentPosition from '@/assets/helpers/parent-position'

export default {
  name: 'p',
  data () { return { classes: ['p'] } },
  mounted () {
    this.classes.push(parentPosition(this))
  }
}
</script>

<style lang="scss">
@import '../../assets/vars';

.p { 
  @include body-text;
  color: $body;
  margin-bottom: 20;

  &.last {
    margin-bottom: 0;
  }

  &.faded {
    opacity: .5;
  }

  .white & {
    color: white;
  }
}
</style>

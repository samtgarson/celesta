<template>
  <Label class="p" v-on="$listeners" v-bind="$attrs" textWrap="true" ref="label">
    <slot />
  </Label>
</template>

<script>
export default {
  name: 'p'
}
</script>

<style lang="scss">
@import '../../assets/vars';

.p { 
  @include body-text;
  color: $body;
  margin-bottom: 20;

  &.faded {
    opacity: .5;
  }

  .white & {
    color: white;
  }
}
</style>

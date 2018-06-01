<template>
  <FlexboxLayout class="input-wrapper">
    <TextField flexGrow="1" class="input" v-bind="$attrs" v-on="$listeners" v-model="val" />
    <icon colour="white" name="alert-circle" v-if="invalid" flexGrow="0" />
  </FlexboxLayout>
</template>

<script>
export default {
  data () {
    return { val: '' }
  },
  props: ['value', 'invalid'],
  watch: {
    value: {
      handler (v) { this.val = v },
      immediate: true
    },
    val (v) {
      this.$emit('input', v)
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/vars';

.input-wrapper {
  border-bottom-width: 2;
  border-bottom-color: $body;
  padding-bottom: 12i;
  margin-bottom: 20;

  .icon {
    margin-top: 8
  }

  .white & {
    border-bottom-color: white;
  }
}

.input {
  @include body-text;
  placeholder-color: rgba($body, .5);
  color: $body;

  .white & {
    placeholder-color: rgba(255, 255, 255, .5);
    color: white;
    border-bottom-color: white;
  }
}

</style>

<template>
  <mood-box colour="green">
    <input 
      :invalid="submitted && !name" 
      v-model="name" 
      hint="Instrument name" 
      @focus="$refs.select.open = false" 
      returnKeyType="next"
      @returnPress="$refs.select.open = true"
     />
    <select v-model="type" :items="items" ref="select" />
    <FlexboxLayout @tap="submit" class="button" horizontalAlignment="right">
      <p>Let's Go</p>
      <icon namespace="white" name="chevron-right" />
     </FlexboxLayout>
  </mood-box>
</template>

<script>
import { titleize } from 'inflect'
import { createNamespacedHelpers } from 'vuex'
import MoodBox from './mood-box'
import instruments from '../../assets/helpers/instruments'

const { mapActions } = createNamespacedHelpers('instruments')
const items = instruments.reduce((hsh, i) => ({
  ...hsh,
  [i]: titleize(i)
}), {})

export default {
  components: { MoodBox },
  data () {
    return { name: '', type: '', items, submitted: false }
  },
  computed: {
    valid () { return this.name.length }
  },
  watch: {
    name () { this.submitted = false },
    type () { this.submitted = false }
  },
  methods: {
    ...mapActions(['addInstrument']),
    submit () {
      this.submitted = true
      if (!this.valid) return
      this.addInstrument({ name: this.name, type: this.type })
      this.$emit('success')
    }
  }
}
</script>

<style lang="scss" scoped>
.button {
  margin-top: 10;

  .p {
    margin-bottom: 0;
  }

  .icon {
    margin-top: 5;
    margin-left: 5;
  }
}
</style>

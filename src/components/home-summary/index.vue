<template>
  <mood-box :mood="mood.mood">
    <div class="padder">
      <face :mood="mood.mood" colour="white" />
      <p class="faded">{{ greeting }}</p>
      <p>{{ mood.status | t }}</p>
    </div>
  </mood-box>
</template>

<script>
import { NO_PRACTICES } from '@/assets/constants/statuses'
import MoodBox from '@/components/molecules/mood-box'
import Face from '@/components/face'
import { createNamespacedHelpers, mapState } from 'vuex'

const { mapGetters } = createNamespacedHelpers('practices')

export default {
  components: { MoodBox, Face },
  computed: {
    firstTime () {
      return this.mood.status === NO_PRACTICES
    },
    ...mapGetters(['mood']),
    ...mapState({
      greeting ({ anonymous }, { firstName }) {
        const name = anonymous ? `, ${firstName}` : ''
        return this.firstTime ? `Welcome${name}!` : `Welcome${name} back!`
      }
    })
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/vars';

.padder {
  padding: $big-margin + $small-margin;
}
</style>

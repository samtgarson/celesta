<template>
  <Page class="page">
    <ActionBar class="action-bar" title="Home"/>
    <StackLayout>
      <Label>{{ user.uid }}</Label>
      <Button class="btn btn-primary" @tap="$router.push('/counter')">Counter</Button>
      <Button class="btn btn-primary" @tap="$router.push('/hello')">Hello World</Button>
    </StackLayout>

  </Page>
</template>
<script>
import { mapState } from 'vuex'

export default {
  computed: mapState(['user']),
}
</script>


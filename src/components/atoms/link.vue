<script>
export default {
  functional: true,
  render (h, ctx) {
    const { route, exact } = ctx.props

    const props = {
      ...ctx.props,
      exact: exact !== undefined ? exact : (route === 'home'),
      tag: ctx.props.tag || 'p',
      to: ctx.props.to || { name: route },
      activeClass: 'active',
      event: 'tap'
    }

    return h('router-link', { ...ctx.data, props }, ctx.children)
  }
}
</script>

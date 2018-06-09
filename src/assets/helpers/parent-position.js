export default comp => {
  const index = comp.$parent.$children.indexOf(comp)
  const total = comp.$parent.$children.length

  const res = []
  if (index === 0) res.push('first')
  if (index === total - 1) res.push('last')
  return res
}

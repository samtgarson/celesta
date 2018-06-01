import Vue from 'nativescript-vue'

const atoms = require.context('../components/atoms')
atoms.keys().forEach(atom => {
  const comp = atoms(atom).default
  const defaultName = atom.replace('.vue', '').replace('./', '')
  Vue.component(comp.name || defaultName, comp)
})

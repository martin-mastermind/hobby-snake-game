<template>
  <Panel />
  <Field />
</template>

<script>
import Panel from './components/Panel.vue'
import Field from './components/Field.vue'

export default {
  name: 'App',
  components: {
    Panel,
    Field
  }
}
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: 'Source Sans Pro', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

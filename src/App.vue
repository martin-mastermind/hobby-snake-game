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
:root {
    --panel-background: #32CD32;
    --panel-btn-main: #239023;
    --panel-btn-hover: #145214;
    --panel-btn-active: #0f3e0f;

    --game-snake-head: #28a428;
    --game-snake-body: #32CD32;
    --game-point: #902323;
}

html, body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: 'Source Sans Pro', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  width: 100vw;
  height: 100vh;
}
</style>

<template>
  <hello-world :name="name">Hello World.</hello-world>
</template>

<script lang="ts">
import { Component, Vue, Provide } from 'vue-property-decorator'

@Component
export default class App extends Vue {
  @Provide()
  private name: string = 'My Component'
  
}
</script>
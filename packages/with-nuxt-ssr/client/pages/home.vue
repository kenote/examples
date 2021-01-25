<template>
  <div>
    home {{ name }}
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from 'nuxt-property-decorator'

@Component<HomePage>({
  name: 'home-page',
  created () {
    console.log(this.name)
  }
})
export default class HomePage extends Vue {

  @Provide() name: string = 'dkkdkd'
}
</script>
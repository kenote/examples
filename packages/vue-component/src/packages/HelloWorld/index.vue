<template>
  <div>
    <div>
      name: {{ name }}
    </div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component({
  name: 'hello-world'
})
export default class HelloWorld extends Vue {
  
  @Prop({ type: String, default: '', required: false })
  private name!: string
}
</script>
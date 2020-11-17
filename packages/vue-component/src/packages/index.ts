import Vue from 'vue'
import HelloWorld from './HelloWorld'

export const Plugin = {
  install: (vue: typeof Vue): void => {
    vue.component('hello-world', HelloWorld)
  }
}

export default {
  Plugin,
  HelloWorld
}

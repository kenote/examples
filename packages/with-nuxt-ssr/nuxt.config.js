


module.exports = {
  telemetry: false,
  env: {},
  srcDir: 'client',
  loading: {
    color: '#00c58e', 
    height: '2px'
  },
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxt/components',
    // '@nuxtjs/svg'
  ],
  router: {
    extendRoutes (routes, resolve) {
      // routes.push({
      //   name: 'custom',
      //   path: '*',
      //   component: resolve(__dirname, 'client/components/error-page.vue')
      // })
    }
  }
}
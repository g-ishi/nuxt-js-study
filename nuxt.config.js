export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'my-first-nuxt-app',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com' },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios'
  ],
  axios: {
    debug: true,
    baseURL: "https://nuxt-blog-b1730-default-rtdb.asia-southeast1.firebasedatabase.app"
    
  },

  env: {
    baseUrl: process.env.BASE_URL || "https://nuxt-blog-b1730-default-rtdb.asia-southeast1.firebasedatabase.app",
    fbAPIKey: "AIzaSyA9mn2_34evorcwd9f-9Zt5mQ1WVWhi84E",
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

}

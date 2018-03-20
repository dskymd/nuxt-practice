module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'nuxt-practice',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' },
      { name: 'author', content: 'dskymd@gmail.com' },
    ],
    script: [
      //{ src: 'https://fast.fonts.net/jsapi/807ad98e-03d1-4e1f-86ec-f618200ffa92.js'},
      { src: 'https://fast.fonts.net/jsapi/56052d8e-22d0-4dfc-b805-c513c339b96b.js'},
      { src: 'https://use.fontawesome.com/releases/v5.0.8/js/all.js'}
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      //{ rel: 'stylesheet', href: 'https://bluelug.com/css/bluelug-instagram.css'}
      
    ]
  },
  css: [
    { src: 'bootstrap/dist/css/bootstrap-reboot.min.css' },
    { src: 'bootstrap/dist/css/bootstrap.min.css' }
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    
    //publicPath: 'https://bluelug.com/contents/mydiacompe/',

    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  transition: {
    name: 'page',
    mode: 'out-in',
    beforeEnter (el) {
      console.log('Before enter...');
    }
  }
}

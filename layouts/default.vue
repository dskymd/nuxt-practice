<template>
    <div>
        <!-- <my-header/> -->
        <nuxt/>
        <!-- <my-footer/> -->
    </div>
</template>

<script>
import MyHeader from '~/components/Header.vue'
import MyFooter from '~/components/Footer.vue'

export default {

  components: { MyHeader, MyFooter }
  
}
</script>


<style lang="scss">
@import '~assets/vars.scss';

html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 10px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  /* box-sizing: border-box; */
  width: 100%;

  h1 { }
}
/*
*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
}
*/
</style>

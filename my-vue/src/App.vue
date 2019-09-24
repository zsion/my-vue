<template>
  <div id="app">
    <transition name="router-fade" mode="out-in">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition name="router-fade" mode="out-in">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body{margin: 0 auto;background: #F6F7F5;max-width: 768px;}
a,img,button,input,textarea,span,label{-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-tap-highlight-color: transparent;}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-family: PingFangSC-Regular;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  font-size: 16px;
  background: #F6F6F7!important;
}
.mint-header.is-fixed{font-size: 1.1875rem;background: #00BEEE;}
</style>

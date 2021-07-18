<template>

  <router-view/>
<!--  <router-view v-if="isRouterAlive" v-slot="{ Component }">-->
<!--    <keep-alive>-->
<!--      <component :is="Component"/>-->
<!--    </keep-alive>-->
<!--  </router-view>-->
</template>

<script setup>
import {nextTick, provide, ref} from "vue";

const isRouterAlive = ref(true)

const reload = () => {
  isRouterAlive.value = false
  nextTick(() => {
    isRouterAlive.value = true
  })
}
provide('reload', reload)
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
}
</style>

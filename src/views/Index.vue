<template>

  <div class="layout-container">
    <!-- 子路由出口 -->
        <router-view/>

<!--    <router-view/>-->
    <!-- /子路由出口 -->

    <!-- 底部导航栏 -->


    <van-tabbar v-model="active" route :key="$route.path">
      <van-tabbar-item to="/" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/discovery" icon="newspaper-o">发现</van-tabbar-item>
      <van-tabbar-item to="/my" icon="manager-o">我的</van-tabbar-item>
    </van-tabbar>
    <!-- /底部导航栏 -->
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {useRoute} from "vue-router";
import store from '../store'
import router from "../router";

const rrs = ["/", "/qa", "/video", "/my"]
const active = ref(0)

const tabSwitch = () => {
  const path = useRoute().path
  rrs.forEach(
      (value, index) => {
        if (value === path) {
          active.value = index
        }
      }
  )
}
tabSwitch()

const ifLogin = () => {
  if (store.state.user == null)
    router.push('/login')
}
ifLogin()
</script>
<style scoped>
</style>
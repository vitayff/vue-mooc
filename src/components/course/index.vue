<template>
  <van-nav-bar
      left-text="返回"
      left-arrow
      @click-left="$router.push('/')"
  />
  <van-tabs v-model:active="active">
    <van-tab title="资源" to="/resources"/>
    <van-tab title="活动" to="/activity"/>
    <van-tab title="成员" to="/member"/>
  </van-tabs>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component"/>
    </keep-alive>
  </router-view>
</template>

<script setup>
import {onUpdated, ref} from "vue";
import {useRoute} from "vue-router";
import router from "../../router";

const active = ref(1)
const rr = ['/resources', '/activity', '/member']
router.push(rr[1])
onUpdated(
    () => {
      for (let i = 0; i < rr.length; i++) {
        if (rr[i] === useRoute().path)
          active.value = i
      }
    }
)
</script>

<style scoped>

</style>
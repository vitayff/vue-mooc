<template>
  <div class="my-container">
    <van-tabs v-model="active">
      <template #nav-right >
        <van-icon style="height: 44px; width: 66px;margin-top: 7px" size="30" name="plus" />
      </template>
      <van-tab v-for="channel in channels" :title="channel.name">
        <van-empty description="还没有班课"/>
        <article-list :channel="channel"/>
      </van-tab>
    </van-tabs>


  </div>
</template>

<script setup lang="ts">
import ArticleList from './ArticleList.vue'
import {getUserChannels} from "../../api/user";
import {ref} from "vue";

const active = ref(1)
const channels = [
  {name: "我创建的", id: 0},
  {name: "我加入的", id: 1},
]
</script>

<style lang="scss" scoped>


.nut-navbar {
  position: relative;
  display: flex;
  align-items: center;
  height: 44px;
  padding: 13px 16px;
  background: #409EFF;
  box-shadow: 0 1px 7px 0 #edeef1;
  font-size: 14px;
  color: #666666;
  margin-bottom: 0;


  .title-text {
    line-height: 40px;
  }

  .yzm {
    height: 40px;
    width: 160px;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.5;
    background: white;
    border-radius: 20px;

  }
}
</style>
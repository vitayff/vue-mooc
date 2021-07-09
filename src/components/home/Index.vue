<template>
  <div class="my-container" :key="$route.path">
    <van-tabs v-model:active="active">
      <template #nav-right>
        <van-icon @click="show=!show" style="height: 44px; width: 66px;margin-top: 7px" size="30" name="plus"/>
      </template>
      <van-tab title="我创建的">
        <van-empty description="还没有创建的班课"/>
        <!--        <course-list channel="0"/>-->
      </van-tab>
      <van-tab title="我加入的">
        <course-list channel="1"/>
      </van-tab>
    </van-tabs>

    <van-popup
        v-model:show="show"
        position="bottom"
        :style="{ height: '30%' }"
    >
      <van-button color="#7232dd" plain size="large">创建课程</van-button>
      <van-button color="#7232dd" plain size="large" @click="$router.push('joinOne')">使用课程号加入课程</van-button>
    </van-popup>
  </div>
</template>

<script setup>
import CourseList from './CourseList.vue'
import {ref, watchEffect} from "vue";
import {Dialog} from "vant";
import store from "../../store";
import {addcourse} from "../../api/course";

const show = ref(false)
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
  background: #409eff;
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
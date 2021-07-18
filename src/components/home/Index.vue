<template key="home">
  <div class="my-container">
    <van-tabs v-model:active="active" key="index">
      <template #nav-right>
        <van-icon @click="show=!show" style="height: 44px; width: 66px;margin-top: 7px" size="30" name="plus"/>
      </template>
      <div v-if="flag()">
        <van-tab title="我创建的">
          <van-empty description="还没有创建的班课"/>
        </van-tab>
        <van-tab title="我加入的">
          <course-list/>
        </van-tab>
      </div>
      <div v-else>
        <van-tab title="我创建的">
          <course-list/>
        </van-tab>
        <van-tab title="我加入的">
          <van-empty description="还没有加入的班课"/>
        </van-tab>
      </div>
    </van-tabs>

    <van-popup
        v-model:show="show"
        position="bottom"
        :style="{ height: '30%' }"
    >
      <van-button color="#7232dd" plain size="large" @click="gotoWhere">创建课程</van-button>
      <van-button color="#7232dd" plain size="large" @click="gotoWhere">使用课程号加入课程</van-button>
    </van-popup>
  </div>
</template>

<script setup>
import CourseList from './CourseList.vue'
import {onMounted, ref} from "vue";
import store from "../../store";
import router from "../../router";

const show = ref(false)
const active = ref(1)
const flag = () => {
  return store.state.flag === 1
}
const gotoWhere = () => {
  show.value=false
  if (flag())
    router.push('joinOne')
  else
    router.push('createOne')
}
onMounted(() => {
  if (flag())
    active.value = 1
  else
    active.value = 0
})
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
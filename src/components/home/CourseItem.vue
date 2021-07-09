<template>
  <van-card
      thumb="src/assets/book.jpg"
      @click="gotoCourse"
  >
    <template #title>
      <h3>{{ course.courseName }}</h3>
    </template>
    <template #num>
      <van-icon name="arrow" size="28"/>
    </template>
  </van-card>
</template>

<script setup>
import dayjs from 'dayjs'

// 加载中文语言包
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
import router from "../../router";
import store from "../../store";
// 配置使用处理相对时间的插件
dayjs.extend(relativeTime)
// 配置使用中文语言包
dayjs.locale('zh-cn')

const props = defineProps({
  course: {
    type: Object,
    required: true
  }
})
const gotoCourse=()=>{
  store.commit('setCid', props.course.courseId)

  router.push('/course')
}
const formantTime = (value) => {
  return dayjs().from(dayjs(value))
}


</script>

<style scoped lang="scss">
</style>
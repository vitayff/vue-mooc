<template>
  <div class="article-list">
    <van-pull-refresh
        v-model="isRefreshLoading"
        :success-text="refreshSuccessText"
        :success-duration="1500"
        @refresh="onRefresh"
    >
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-empty v-if="empty" description="还没有班课"/>
        <course-item v-for="(course, index) in courses" :key="index" :course="course"/>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script setup>

import {ref} from "vue";
import {getCourses} from "../../api/course";
import CourseItem from "./CourseItem.vue";

const props = defineProps({
  channel: {
    type: String,
    required: true
  }
})

// const {channel} = toRefs(props) 复杂对象无法结构
const courses = ref([]),
    loading = ref(false), // 控制加载中的 loading 状态
    finished = ref(false), // 控制加载结束的状态，当加载结束，不再触发加载更多
    isRefreshLoading = ref(false), // 下拉刷新的 loading 状态
    refreshSuccessText = ref(''), // 下拉刷新成功的提示文本
    empty = ref(false)

const onLoad = async () => {
      // 1. 请求获取数据
      const {data} = await getCourses({
        courseId: 0, // 频道 ID
      })
      empty.value = data === [];
      // 2. 把数据放到 list 数组中
      courses.value.push(...data)

      // 3. 设置本次加载状态结束，它才可以判断是否需要加载下一次，否则就会永远的停在这里
      loading.value = false

      // 4. 数据全部加载完成
      finished.value = true
    },
    onRefresh = async () => {
      // 下拉刷新，组件自己就会展示 loading 状态
      // 1. 请求获取数据
      const {data} = await getCourses({
        courseId: 0,
      })

      // 2. 把数据放到数据列表中（往顶部追加）
      empty.value = data === [];
      // 2. 把数据放到 list 数组中
      courses.value = data

      // 3. 关闭刷新的状态 loading
      isRefreshLoading.value = false

      refreshSuccessText.value = `更新了条数据`
    }


</script>

<style lang="scss" scoped>
.article-list {
  position: fixed;
  left: 0;
  right: 0;
  top: 50px;
  bottom: 50px;
  overflow-y: auto;
}
</style>
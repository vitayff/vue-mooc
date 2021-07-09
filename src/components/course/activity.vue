<template>
  <van-list
      v-model:loading="loading"
      v-model:error="err"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      error-text="请求失败，点击重新加载"
  >
    <van-cell-group border inset>
      <van-cell v-for="ac in activities" :title="ac.title" >
        <template #label>
          {{ ac.desc }}
        </template>
        <template #value>
          {{ isEnd(ac.endTime) ? '进行中' : '已结束' }}
          <br/>
          100经验
        </template>
      </van-cell>
    </van-cell-group>
  </van-list>
</template>

<script setup>
import {getCourseDetail} from '../../api/course'
import store from '../../store'
import {ref} from "vue";
import dayjs from "dayjs";

const finished = ref(false)
const loading = ref(false)
const err = ref(false)
const activities = ref([])
const onLoad = async () => {
  try {
    const {data} = await getCourseDetail({
      courseId: store.state.cID,
      cType: 2
    })
    activities.value.push(...data)
    finished.value = true
    loading.value = false
  } catch (e) {
    console.log(e)
  }
}
const isEnd = (dd) => {
  return dayjs(dd) >= dayjs();
}
</script>

<style scoped>
</style>
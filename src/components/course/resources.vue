<template key="res">
  <van-list
      v-model:loading="loading"
      v-model:error="err"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      error-text="请求失败，点击重新加载"
  >
    <van-cell-group border inset>
      <van-cell v-for="ac in res" :title="ac.desc" :label="ac.title" :url="ac.resUrl">
        <template #value>
          上传时间：<br/>
          {{ date(ac.createdDate) }}
        </template>
      </van-cell>
    </van-cell-group>
    <div v-if="!flag()">
      <van-button round type="primary" @click="$router.push('upload')">添加新文件</van-button>
    </div>
  </van-list>
</template>
<script setup>
import {getCourseDetail} from '../../api/course'
import store from '../../store'
import {ref} from "vue";
import dayjs from "dayjs";

const flag = () => {
  return store.state.flag === 1
}


const finished = ref(false)
const loading = ref(false)
const err = ref(false)
const res = ref([])
const onLoad = async () => {
  try {
    const {data} = await getCourseDetail({
      courseId: store.state.cID,
      cType: 1
    })
    res.value.push(...data)
    finished.value = true
    loading.value = false
  } catch (e) {
    console.log(e)
  }
}
const date = (dd) => {
  const format = 'YYYY-MM-DD HH:mm'
  return dayjs(dd).format(format)
}
</script>

<style scoped>

</style>
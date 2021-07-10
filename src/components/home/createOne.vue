<template>
  <van-nav-bar left-arrow @click-left="$router.back()" title="创建课程"/>
  <div class="add-course">
    <van-field placeholder="请输入课程号" v-model="courseId" type="digit" label="课程号"/>
    <van-field placeholder="请输入课程名" v-model="courseName" label="课程名"/>
    <van-button plain type="primary" size="normal" @click="newcourse">创建课程</van-button>
  </div>
</template>

<script setup>

import {ref} from "vue";
import {tNewClass} from '../../api/teacher'
import {Toast} from "vant";
import router from "../../router";

const courseName = ref('')
const courseId = ref(null)
const newcourse = async () => {
  try {
    const {data} = await tNewClass({courseId: courseId.value, courseName: courseName.value})
    console.log(data)
    Toast.success('创建成功')
    router.back()
  } catch {
    Toast.fail('创建失败，课程号已存在')
  }
}
</script>

<style scoped>
.add-course {
  margin-top: 10vh;
}
</style>
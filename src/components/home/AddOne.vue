<template>
  <van-nav-bar left-arrow @click-left="$router.back()" title="加入课程" />
  <div class="add-course">
    <van-field placeholder="请输入课程号" v-model="courseId" type="digit" label="课程号"/>
    <van-button plain type="primary" size="normal" @click="newcourse">加入课程</van-button>
  </div>
</template>

<script setup>
import {addcourse, getCourses} from "../../api/course";
import {Dialog, Toast} from "vant";
import {ref} from "vue";
import router from "../../router";

const courseId = ref(null)
const newcourse = async () => {
  try {
    const {data} = await getCourses({courseId: courseId.value})
    console.log(data)
    Dialog.confirm({
      title: '确认提示',
      message: `确认加入课程${data.courseName}吗?`
    }).then(
        () => {
          addcourse({courseId: courseId.value})
          console.log("加入课程")
          Toast.success('加入成功')
          router.back()
        }
    ).catch(() => {
      console.log("取消操作")
    })
  } catch {
    Toast.fail('加入失败，课程号错误')
  }
}
</script>

<style scoped lang="scss">
.add-course {
  margin-top: 10vh;
}
</style>
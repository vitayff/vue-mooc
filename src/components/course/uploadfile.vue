<template key="upload">
  <van-nav-bar left-arrow @click-left="$router.back()" title="上传资源"/>
  <div class="upload-file">
    <van-field placeholder="请输入资源描述" v-model="desc" label="资源描述"/>
    <van-field name="uploader" label="文件上传">
      <template #input>
        <van-uploader v-model="value" :after-read="afterRead"/>
      </template>
    </van-field>
    <van-loading type="spinner" color="#1989fa" v-show="show"/>
    <van-button :disabled="disabled" plain type="primary" size="normal" @click="onUpload">上传课程资源</van-button>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {addRes} from '../../api/teacher'
import {Toast} from "vant";
import store from '../../store'

const show = ref(false)
const desc = ref('')
const params = new FormData()
const value = ref([])
const disabled = ref(false)
const hasPic = ref(false)
const afterRead = async (file) => {
  params.append('file', file.file)
  hasPic.value = true
};

const onUpload = async () => {

  if (!hasPic.value) {
    Toast.fail('请上传文件')
    return
  }


  params.append('desc', desc.value)
  params.append('courseId', store.state.cID)



  try {
    show.value = true
    await addRes(params)
    Toast.success('上传成功')
    show.value = false
  } catch (e) {
    show.value = false
    console.log(e)
    Toast.fail('上传失败')
  } finally {
    disabled.value = true
  }

}
</script>

<style scoped>
.upload-file {
  margin-top: 10vh;
}
</style>
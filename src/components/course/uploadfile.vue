<template>
  <van-field name="uploader" label="文件上传">
    <template #input>
      <van-uploader v-model="value" :after-read="afterRead"/>
    </template>
  </van-field>
</template>

<script setup>
import {ref} from "vue";
import {uploadFile} from "../../api/course";

const value = ref([])
const afterRead = async (file) => {
  console.log(file.file)
  const params = new FormData()
  params.append('file', file.file)
  params.append('desc', '测试中')
  file.status = 'uploading';
  file.message = '上传中...';
  try {
    await uploadFile(params)
    file.status = ''
    file.message = '上传完成';
  } catch (e) {
    file.status = 'failed'
    file.message = '上传失败';
    console.log(e)
  }
};
</script>

<style scoped>

</style>
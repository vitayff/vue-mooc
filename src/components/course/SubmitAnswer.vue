<template key="answer">
  <van-nav-bar left-arrow @click-left="goback" title="作答"/>
  <div class="upload-file">
    <van-cell-group border inset>
      <van-cell :title="act.title">
        <template #label>
          {{ act.desc }}
        </template>
        <template #value>100经验</template>
      </van-cell>
      {{ actend }}
    </van-cell-group>
    <van-field placeholder="请输入资源描述" :disabled="disabled2" v-model="desc" label="资源描述"/>
    <van-field name="uploader" label="文件上传">
      <template #input>
        <van-uploader :disabled="disabled2" v-model="value" :after-read="afterRead"/>
      </template>
    </van-field>
    <van-loading type="spinner" color="#1989fa" v-show="show"/>
    <van-button :disabled="disabled" plain type="primary" size="normal" @click="onUpload">提交</van-button>
  </div>
</template>

<script setup>
import {inject, onBeforeMount, onBeforeUnmount, onMounted, ref} from "vue";
import {uploadFile} from '../../api/course'
import {Toast} from "vant";
import store from '../../store'
import {getActivity} from '../../api/activity'
import router from "../../router";

const actend = ref('')
const disabled2 = ref(false)
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
const act = ref(null)
const getAct = async () => {
  const {data} = await getActivity({aid: store.state.activity})
  act.value = data
  console.log(act.value)
}
const reload = inject('reload')
const onUpload = async () => {

  if (!hasPic.value) {
    Toast.fail('请上传文件')
    return
  }

  params.append('desc', desc.value)
  params.append('aid', store.state.activity)
  try {
    show.value = true
    await uploadFile(params)
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
const goback = () => {
  reload()
  router.back()
}
onBeforeMount(() => {
  act.value = {
    title: '',
    desc: ''
  }
  getAct()
})
if (store.state.isactable)
  actend.value = '任务已结束'
disabled.value = store.state.isactable
disabled2.value = store.state.isactable
</script>

<style scoped>
.upload-file {
  margin-top: 7vh;
}
</style>
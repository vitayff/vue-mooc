<template>
  <div class="article-list">
    <van-pull-refresh
        v-model="isRefreshLoading"
        :success-text="refreshSuccessText"
        :success-duration="1500"
        @refresh="onRefresh"
    >
      <van-empty v-if="JSON.stringify(articles) === '[]'" description="没有内容"/>
      <van-list
          v-model:loading="loading"
          v-model:error="err"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          error-text="请求失败，点击重新加载"
      >
        <article-item v-for="(article, index) in articles" :key="index" :article="article"/>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script setup>

import {getArticles} from '../../api/article'
import ArticleItem from "./ArticleItem.vue";
import {ref} from "vue";

// const {channel} = toRefs(props) 复杂对象无法结构
const articles = ref([]),
    loading = ref(false), // 控制加载中的 loading 状态
    finished = ref(false), // 控制加载结束的状态，当加载结束，不再触发加载更多
    isRefreshLoading = ref(false), // 下拉刷新的 loading 状态
    refreshSuccessText = ref(''), // 下拉刷新成功的提示文本
    err = ref(false)

const onLoad = async () => {

      // 1. 请求获取数据
      await getArticles().then(
          (dd) => {
            {
              const {data} = dd
              console.log(data)
              const {results} = data
              // 2. 把数据放到 list 数组中

              articles.value.push(...results)

              // 3. 设置本次加载状态结束，它才可以判断是否需要加载下一次，否则就会永远的停在这里
              loading.value = false

              // 4. 数据全部加载完成

              // 没有数据了，把加载状态设置结束，不再触发加载更多
              finished.value = true

            }
          }
      ).catch((e) => {
        console.log(e)
        loading.value = false
        err.value = true
      })
    },
    onRefresh = async () => {
      // 下拉刷新，组件自己就会展示 loading 状态
      // 1. 请求获取数据
      await getArticles().then(
          (dd) => {
            const {data} = dd
            // 2. 把数据放到数据列表中（往顶部追加）
            const {results} = data
            articles.value.unshift(...results)

            // 3. 关闭刷新的状态 loading
            isRefreshLoading.value = false
            refreshSuccessText.value = `更新了${results.length}条数据`
          }
      ).catch(() => {
        isRefreshLoading.value = false
        refreshSuccessText.value = `更新失败`
      })
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
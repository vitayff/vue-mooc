<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="isRefreshLoading"
      :success-text="refreshSuccessText"
      :success-duration="1500"
      @refresh="onRefresh"
    >
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <article-item v-for="(article, index) in articles" :key="index" :article="article" />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script setup>

import { getArticles } from '../../api/article'
import ArticleItem from "./ArticleItem.vue";
import { defineProps, ref, toRefs } from "vue";


const props = defineProps({
  channel: {
    type: Object,
    required: true
  }
})

// const {channel} = toRefs(props) 复杂对象无法结构
const articles = ref([]),
  loading = ref(false), // 控制加载中的 loading 状态
  finished = ref(false), // 控制加载结束的状态，当加载结束，不再触发加载更多
  timestamp = ref(null), // 获取下一页数据的时间戳
  isRefreshLoading = ref(false), // 下拉刷新的 loading 状态
  refreshSuccessText = ref('') // 下拉刷新成功的提示文本

const onLoad = async () => {
  // 1. 请求获取数据
  const { data } = await getArticles({
    channel_id: 11, // 频道 ID
    timestamp: timestamp.value || Date.now(), // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳，timestamp 相当于页码，请求最新数据使用当前最新时间戳，下一页数据使用上一次返回的数据中的时间戳
    with_top: 1 // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
  })

  // 2. 把数据放到 list 数组中
  const { results } = data.data
  articles.value.push(...results)

  // 3. 设置本次加载状态结束，它才可以判断是否需要加载下一次，否则就会永远的停在这里
  loading.value = false

  // 4. 数据全部加载完成
  if (results.length) {
    // 更新获取下一页数据的页码
    timestamp.value = data.data.pre_timestamp
  } else {
    // 没有数据了，把加载状态设置结束，不再触发加载更多
    finished.value = true
  }
},
  onRefresh = async () => {
    // 下拉刷新，组件自己就会展示 loading 状态
    // 1. 请求获取数据
    const { data } = await getArticles({
      channel_id: props.channel.id, // 频道 ID
      timestamp: Date.now(), // 为了大家方便学习，只要你传递不同的时间戳就一定给你返回不一样的数据，而且数据不为空
      with_top: 1
    })

    // 2. 把数据放到数据列表中（往顶部追加）
    const { results } = data.data
    articles.value.unshift(...results)

    // 3. 关闭刷新的状态 loading
    isRefreshLoading.value = false

    refreshSuccessText.value = `更新了${results.length}条数据`
  }


</script>

<style lang="scss" scoped>
.article-list {
  position: fixed;
  left: 0;
  right: 0;
  top: 90px;
  bottom: 50px;
  overflow-y: auto;
}
</style>
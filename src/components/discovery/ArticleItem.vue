<template>
  <van-cell class="article-item">

    <template #title class="van-multi-ellipsis--l3"><div class="title">{{ article.title }}</div></template>
    <template #label>
      <div v-if="article.cover.type === 3" class="cover-wrap">
        <div class="cover-wrap-item" v-for="(img, index) in article.cover.images" :key="index">
          <van-image class="cover-image" fit="cover" :src="img"/>
        </div>
      </div>
      <div class="label-wrap">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }}评论</span>
        <span>{{ formantTime(article.pubdate) }}</span>
      </div>
    </template>


    <!-- 默认插槽的名字叫 default，可以省略 -->
    <template #value>
      <van-image
          v-if="article.cover.type === 1"
          class="right-cover"
          fit="cover"
          :src="article.cover.images[0]"
      />
    </template>

  </van-cell>
</template>

<script setup>
import dayjs from 'dayjs'

// 加载中文语言包
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
// 配置使用处理相对时间的插件
dayjs.extend(relativeTime)
// 配置使用中文语言包
dayjs.locale('zh-cn')

const props = defineProps({
  article: {
    type: Object,
    required: true
  }
})

const formantTime = (value) => {
  return dayjs().from(dayjs(value))
}


</script>

<style scoped lang="scss">
.article-item {
  .title {
    font-size: 16px;
    color: #000000;
    text-align: left;
  }

  ::v-deep(.van-cell__value) {
    display: flex;
    flex: unset;
    margin-left: 12px;
  }

  .right-cover {
    width: 116px;
    height: 73px;
  }

  .cover-wrap {
    padding: 15px 0;
    display: flex;

    .cover-wrap-item {
      flex: 1;
      height: 73px;

      &:not(:last-child) {
        padding-right: 4px;
      }

      .cover-image {
        width: 100%;
        height: 73px;
      }
    }
  }

  .label-wrap {
    font-size: 11px;
    color: #b4b4b4;
    text-align: left;
  }

  .label-wrap span {
    margin-right: 12px;
  }
}
</style>
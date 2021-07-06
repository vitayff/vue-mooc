<template>
  <div class="my-container">
    <van-nav-bar title="我的"/>
    <article-list/>
  </div>
</template>

<script setup lang="ts">
import ArticleList from './ArticleList.vue'
</script>

<style lang="scss" scoped>


.nut-navbar {
  position: relative;
  display: flex;
  align-items: center;
  height: 44px;
  padding: 13px 16px;
  background: #409EFF;
  box-shadow: 0 1px 7px 0 #edeef1;
  font-size: 14px;
  color: #666666;
  margin-bottom: 0;


  .title-text {
    line-height: 40px;
  }

  .yzm {
    height: 40px;
    width: 160px;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.5;
    background: white;
    border-radius: 20px;

  }
}
</style>
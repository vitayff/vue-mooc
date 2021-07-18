<template>
  <div class="my-container">
    <van-nav-bar title="我的"/>
    <div class="my-head">
      <van-nav-bar class="my-pic">
        <template #left>
          <van-image round width="4rem" height="4rem" src="https://img.yzcdn.cn/vant/cat.jpeg"/>
          <h3>&nbsp;{{ nickname }}</h3>
        </template>
        <template #right>
          编辑资料
          <van-icon name="arrow" size="28"/>
        </template>
      </van-nav-bar>

      <van-grid icon-size="14" square>
        <van-grid-item text="经验值">
          <template #icon>
            <h5>637</h5>
          </template>
        </van-grid-item>
        <van-grid-item text="魅力值">
          <template #icon>
            <h5>637</h5>
          </template>
        </van-grid-item>
        <van-grid-item text="积分">
          <template #icon>
            <h5>637</h5>
          </template>
        </van-grid-item>
        <van-grid-item text="获赞">
          <template #icon>
            <h5>637</h5>
          </template>
        </van-grid-item>
      </van-grid>
    </div>
    <div class="my-body">
      <van-grid :border="false" :column-num="3">
        <van-grid-item text="我的空间">
          <template #icon>
            <van-icon class="pic1" name="src/assets/my/room.png" size="40"/>
          </template>
        </van-grid-item>
        <van-grid-item text="我的收藏">
          <template #icon>
            <van-icon class="pic1" name="src/assets/my/fav.png" size="40"/>
          </template>
        </van-grid-item>
        <van-grid-item text="心意卡片">
          <template #icon>
            <van-icon class="pic1" name="src/assets/my/gift.png" size="40"/>
          </template>
        </van-grid-item>
      </van-grid>

      <van-nav-bar class="body-part2" left-text="我关注的话题">
        <template #right>
          <van-icon name="arrow" size="28"/>
        </template>
      </van-nav-bar>
      <van-grid :border="false" :column-num="3">
        <van-grid-item text="C语言">
          <template #icon>
            <van-icon name="description" size="40"/>
          </template>
        </van-grid-item>
        <van-grid-item text="C#程序设计">
          <template #icon>
            <van-icon name="description" size="40"/>
          </template>
        </van-grid-item>
        <van-grid-item text="汇编语言">
          <template #icon>
            <van-icon name="description" size="40"/>
          </template>
        </van-grid-item>
      </van-grid>
    </div>
    <div class="my-footer">
      <van-nav-bar left-text="设置">
        <template #right>
          <van-icon name="arrow" size="28"/>
        </template>
      </van-nav-bar>
      <van-nav-bar left-text="退出登录" @click="logout">
        <template #right>
          <van-icon name="arrow" size="28"/>
        </template>
      </van-nav-bar>
    </div>
  </div>
</template>

<script setup>
import store from '../../store'
import {inject, ref} from "vue";
import {Dialog} from "vant";

// const reload = inject('reload')
const nickname = ref(store.state.uName)
const logout = () => {
  Dialog.confirm({
    title: '退出提示',
    message: '确认退出吗?'
  }).then(
      () => {
        store.commit('setUser', null)
        console.log("退出登录")
        // reload()
      }
  ).catch(() => {
    console.log("取消操作")
  })
}
// import { ref, watchEffect } from "vue";
// import { Dialog } from "vant";
// import { getUserInfo } from "../../api/user";
// import store from '../../store';

// const currentUser = ref({
//   photo: "",
//   like_count: "",
//   fans_count: "",
//   follow_count: "",
//   art_count: "",
//   name: ""
// })
// const user = ref(null)
// watchEffect(() => {
//   user.value = store.state.user
// })
// const loadCurrentUser = async () => {
//   if (user.value != null) {
//     try {
//       const data = await getUserInfo()
//       currentUser.value = data.data.data
//       console.log(currentUser.value)
//     } catch (e) {
//       console.log(e)
//     }
//   }
// }
// const onLogout = () => {
//   // 提示用户确认退出
//   // 确认 -> 处理退出
//
// }

// watchEffect(loadCurrentUser())
// loadCurrentUser()
</script>

<style lang="scss" scoped>
.my-container {
  .my-head {
    margin-top: 15px;

    .my-pic {
      align-items: center;
      height: 60px;
    }
  }

  .my-body {
    background-color: #eeeeee;
    margin-top: 20px;

    .body-part2 {
      margin-top: 20px;
    }

    .pic1 {
      height: 45px;
      width: 45px;
      border-radius: 50%;
      background-color: rgba(227, 181, 13, 0.1);
    }

    //.pic2 {
    //  background-color: rgba(255, 69, 0, 0.2)
    //}
    //
    //.pic3 {
    //  background-color: rgba(17, 192, 236, 0.2)
    //}
  }

  .my-footer {
    background-color: #eeeeee;
    display: flex;
    flex-direction: column;
    //height: border-box;
    height: 80px;

    .my-setting {
      margin-top: 30px;
    }
  }
}

.not-login {
  background-size: cover;
  padding-top: 35px;
  padding-bottom: 2px;
  height: 240px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: linear-gradient(
          to left top,
          #11c0ec,
          rgba(255, 0, 81, 0.77),
          transparent
  );

  .login-pic {
    background-color: white;
    border-radius: 50%;
    height: 66px;
    width: 66px;
  }

  .login-text {
    color: white;
  }
}

.user-info {
  padding-top: 35px;
  padding-bottom: 2px;
  height: 240px;
  //background: url("src/assets/bj.jpg");
  background: linear-gradient(rgba(15, 72, 219, 0.66), transparent);

  opacity: 0.9;

  .touxiang {
    opacity: 1;
    height: 100px;
    align-items: center;

    .touwenzi {
      opacity: 1;
      line-height: 100px;
      margin: 0 0 0 -18%;
      float: left;
      padding: 0;
    }
  }

  .gezi {
    opacity: 1;
    color: #572020;
    border-style: dotted;
    border-width: 1px;
    border-color: white;
  }
}

.data-info {
  .mini-info {
    background-color: white;

    .info22 {
      height: 90px;
      border-style: solid;
      border-width: 1px;
      border-color: white;
      background-color: #f6f0f0;

      .info33 {
        margin-top: 12px;
      }
    }
  }

  .links {
    text-align: left;
  }

  .logout-btn {
    color: #ec8c1a;
  }
}
</style>
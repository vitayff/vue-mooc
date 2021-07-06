<template>
  <div class="login-container">
    <van-nav-bar left-arrow @click-left="$router.back()" title="注册/登录"/>
    <!-- 导航栏 -->

    <!-- 表单 -->
    <van-cell-group inset class="a-form">
      <van-field
          v-model="user.mobile"
          type="tel"
          maxlength="11"
          placeholder="请输入手机号"
          label="手机号"
          @change="valid1"
      ></van-field>
      <van-field
          v-model="user.code"
          type="tel"
          maxlength="6"
          label="验证码"
          placeholder="请输入验证码"
          ref="code"
          @change="valid2"
      >
        <template #button>
          <van-button
              slot="button"
              size="small"
              :type="bt1 ? 'default' : 'primary'"
              :disabled="bt1"
              @click="onSendSms"
          >{{ sendcode }}
          </van-button>
        </template>
      </van-field>
    </van-cell-group>
    <!-- /表单 -->

    <!-- 登录按钮 -->
    <div class="login-btn-box">
      <van-button color="#6db4fb" :disabled="bt2" type="info" @click="onLogin">登录</van-button>
    </div>
    <!-- /登录按钮 -->

    <van-divider>账号：13611111111 密码：246810</van-divider>
    <van-divider>如果收不到验证码，请使用万能验证码：246810</van-divider>

    <div class="van-checkbox">
      <input type="checkbox" v-model="checked" @click="agree">
      <label>我已阅读并同意<span>《用户协议》</span>和<span>《隐私政策》</span></label>
    </div>
  </div>
</template>

<script setup lang="ts">
import {Toast} from "vant";
import {ref} from "vue";
import {login, sendSms} from '../../api/user'
import store from "../../store";
import router from "../../router";

const checked = ref(false)
const code = ref(null)
const user = ref({mobile: '', code: ''})
const bt1 = ref(true)
const bt2 = ref(true)
const sendcode = ref('发送验证码')
const ff = ref(true)
const phoneOk = ref(false)


const agree = () => {
  checked.value = !!checked.value
}

const valid1 = () => {
  if (/^1[3-9]\d{9}$/.test(user.value.mobile)) {
    phoneOk.value = true
    if (ff.value)
      (bt1.value = false)
  } else {
    phoneOk.value = false
    bt1.value = true
    if (user.value.mobile.length == 11)
      Toast('请输入有效手机号');
  }
}

const valid2 = () => {
  if (/^\d{6}$/.test(user.value.code)) {
    if (phoneOk.value)
      bt2.value = false
  } else {
    bt2.value = true
  }
}


const onSendSms = async () => {
  bt1.value = true
  timeStrat();
  ff.value = false
  code.value.focus()


  try {
    // 校验手机号码
    await sendSms(user.value.mobile)
    // 验证通过 -> 请求发送验证码 -> 用户接收短信 -> 输入验证码 -> 请求登录
    // 请求发送验证码 -> 隐藏发送按钮，显示倒计时
    // 倒计时结束 -> 隐藏倒计时，显示发送按钮
  } catch (err) {
    // try 里面任何代码的错误都会进入 catch
    // 不同的错误需要有不同的提示，那就需要判断了
    let message = ''
    if (err && err.response && err.response.status === 429) {
      // 发送短信失败的错误提示
      message = '发送太频繁了，请稍后重试'
    } else if (err.name === 'mobile') {
      // 表单验证失败的错误提示
      message = err.message
    } else {
      // 未知错误
      message = '发送失败，请稍后重试'
    }

    // 提示用户
    Toast.fail(message)
  }


}


const onLogin = async () => {

  if (!checked.value) {
    Toast("请先勾选下方同意\n《用户协议》和《隐私政策》")
    return
  }

  const load = Toast.loading(
      {
        duration: 0,
        forbidClick: true,
        message: '登录中',
      }
  )

  try {
    const {data} = await login({username: user.value.mobile, password: user.value.code})
    console.log(data)
    store.commit('setUser', data.token)
    store.commit('setNickname', data.nickname)
    Toast.success('登录成功')
    router.back()
  } catch (err) {
    console.log('登录失败', err)
    if (err.response.status === 400) {
      console.log('登录失败', err)
      Toast.fail('登录失败，手机号或验证码错误')
    }
  } finally {
    load.clear()
  }
}

const timeLeave = ref(60)

const timeStrat = () => {

  const tt = setInterval(() => {
    timeLeave.value--
    sendcode.value = "重新发送" + timeLeave.value + "s"
    if (timeLeave.value == 0) {
      sendcode.value = "发送验证码"
      clearInterval(tt)
      bt1.value = false
      ff.value = true
      timeLeave.value = 60
    }
  }, 1000)

}


</script>

<style lang="scss" scoped>
.login-container {
  height: 100%;
  background-color: rgba(223, 225, 231, 0.2);

  .van-checkbox {
    justify-content: center;
    align-items: flex-end;
    margin-top: 50%;
  }

  span {
    color: deepskyblue;
  }

  .a-form {
    padding: 5px;
    margin-top: 50px;
    margin-bottom: 20px;
  }

  //.yzm {
  //  display: flex;
  //  align-items: center;
  //  justify-content: center;
  //  flex-direction: column;
  //
  //  .yz-btn {
  //    height: 100%;
  //    width: 8em;
  //    background-color: white;
  //  }
  //}


  .login-btn-box {
    padding: 15px;

    .van-button {
      width: 100%;
    }
  }

  .van-cell {
    align-items: center;
  }
}
</style>
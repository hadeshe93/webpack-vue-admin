<template lang="html">
  <div class="page page-login">
    <div class="formLogin-wrapper">
      <Form ref="formLogin" :model="formLogin" :rules="formLoginRule" class="formLogin">
        <h1 class="page-login-title">Manager System</h1>
        <FormItem prop="username">
          <Input type="text" v-model="formLogin.username" placeholder="请输入用户名" :autofocus="true"></Input>
        </FormItem>
        <FormItem prop="password">
          <Input type="password" v-model="formLogin.password" placeholder="请输入密码"></Input>
        </FormItem>
        <FormItem>
          <Button type="primary" long @click="handleLogin">登录</Button>
        </FormItem>
      </Form>
      <div class="aside-banner">
        <img :src="loginBkg" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import loginBkg from '@SRC/assets/images/login_bkg.png';
export default {
  data () {
    return {
      loginBkg,
      formLogin: {
        username: 'coco',
        password: 'coco456',
      },
      formLoginRule: {
        username: [
          {required: true, message: '请输入用户名'},
        ],
        password: [
          {required: true, message: '请输入密码'},
        ]
      },
    };
  },
  beforeCreate() {
    // 判断是否登录
    if (this.$auth.isLogin()) {
      // 若已登录，则跳转到首页
      this.$router.push('/');
    } else if (this.$route.query.from === 'logout') {
      // 如果是用户点击了退出然后来到的登录页 或者 在url上直接跳转到logout路由
      if (this.$store.state.manager && this.$store.state.manager.token) {
        // 在服务器中退出账号
        this.$axios.post('user/logout', { token: this.$store.state.manager.token })
          .then((data)=>{
            console.log(data);
          });
      }

      // 清除本地数据
      this.$store.commit({
        type: 'delManager'
      });
    }
  },
  mounted(){
    // 调用QT客户端修改title
    if (this.$bridge && this.$bridge.SetLoginTitle) {
      this.$bridge.SetLoginTitle();
    }
  },
  methods: {
    // 账号登录
    handleLogin: async function() {
      let loginRsp = await this.$axios.post('/user/login', this.formLogin);
      let infoRsp = await this.$axios.get(`/user/getUserInfo?uid=${loginRsp.data.data.uid}&token=${loginRsp.data.data.token}`);
      let data = {
        ...loginRsp.data.data,
        ...infoRsp.data.data,
        username: this.formLogin.username,
      };

      // 将用户数据保存到store
      this.$store.commit({
        type: 'updateManager',
        data: data
      });

      this.$router.push('/');
    },
  }
}
</script>

<style lang="less">
@import "../../assets/styles/config.less";
html, body {
  background-color: @color-background;
}
</style>

<style lang="less" scoped>
@import "../../assets/styles/config.less";

.page-login {
  display: flex;
  justify-content: center;
}
.page-login-title {
  font-family: Palatino,Garamond,Times,Georgia,serif;
  color: darken(@color-primary, 5%);
  margin-bottom: 30px;
}
.formLogin-wrapper {
  width: 840px;
  height: 400px;
  margin: 200px 0 0;
  display: flex;
  flex-direction: row;
  box-shadow: 0 15px 50px -5px rgba(0,0,0,0.2);

}
.formLogin {
  width: 360px;
  height: 400px;
  padding: 50px 60px 0;
  background-color: @color-white;
}
</style>

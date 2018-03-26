<template lang="html">
  <div class="page page-login">
    <div class="formLogin-container">
      <Form ref="formLogin" :model="formLogin" :rules="formLoginRule">
        <FormItem prop="username">
          <Input type="text" v-model="formLogin.username" placeholder="请输入用户名" :autofocus="true"></Input>
        </FormItem>
        <FormItem prop="userpwd">
          <Input type="password" v-model="formLogin.userpwd" placeholder="请输入密码"></Input>
        </FormItem>
        <FormItem>
          <Button type="primary" long @click="handleLogin">登录</Button>
        </FormItem>
      </Form>
      <div class="">
        <Button type="primary" @click="handleLogout">退出</Button>
        <Button type="primary" @click="handleGetManager">获取信息</Button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formLogin: {
        username: '',
        userpwd: '',
      },
      formLoginRule: {
        username: [
          {required: true, message: '请输入用户名'},
        ],
        userpwd: [
          {required: true, message: '请输入密码'},
        ]
      },
    };
  },
  beforeCreate() {
    // 若已登录，则跳转到首页
    if (this.$auth.isLogin) {
      this.$router.push('/');
    }
  },
  methods: {
    // 账号登录
    handleLogin () {
      // 登录成功
      var data = {
        username: 'John Ha',
        userpwd: '123'
      };
      this.$auth.login(data);
      this.$store.commit({
        type: 'updateManager',
        data: data
      });
      this.$router.push('/');
    },
    // 账号退出
    handleLogout () {
      this.$auth.logout();
      this.$store.commit({
        type: 'updateManager',
        data: null
      });
    },
    // 获取账号信息
    handleGetManager() {
      console.log(this.$auth.getManager());
    }
  }
}
</script>

<style lang="less" scoped>
.page-login {
  display: flex;
  justify-content: center;
}
.formLogin-container {
  width: 300px;
  margin-top: 100px;
  text-align: center;
}
</style>

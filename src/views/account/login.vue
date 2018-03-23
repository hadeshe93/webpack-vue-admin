<template lang="html">
  <div class="">
    登录页<br/>
    <Button type="primary" @click="login">登录</Button>
    <Button type="primary" @click="logout">退出</Button>
    <Button type="primary" @click="getManager">获取信息</Button>
  </div>
</template>

<script>
export default {
  methods: {
    login () {
      this.$auth.login({username: 'John Ha', userpwd: '123'});
      this.$router.push('/');
    },
    logout () {
      console.log(this.$auth.logout());
    },
    getManager () {
      console.log(this.$auth.getManager());
    }
  }
}
</script>

<style lang="css">
</style>

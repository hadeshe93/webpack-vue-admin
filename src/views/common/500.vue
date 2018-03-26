<template lang="html">
  <div class="page page-error">
    <h1>500</h1>
    <p>SERVER ERROR</p>
    <div class="conetnt">
      <Button type="primary" size="large" @click="handleBack">返回上一页</Button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    handleBack () {
      this.$router.go(-1);
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/styles/config.less';

.page {
  .cfg-page;
}
</style>

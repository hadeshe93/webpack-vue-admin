<template lang="html">
<div class="layout">
  <Layout :style="{minHeight: '100vh'}">
    <Sider class="layout-sider" :style="{background: '#fff'}">
      <left-menu :menus="menus" :active-name="activeName" @on-select="handleMenuSelected"></left-menu>
    </Sider>
    <Layout>
      <Header :style="{background: '#fff', borderBottom: '1px solid #DDDEE1'}"></Header>
      <Content class="layout-content">
        <Breadcrumb class="layout-content-breadcrumb">
          <BreadcrumbItem v-show="!(index===0 && item.name=='/' && breadcrumbs[1]['name']==='/index')"
            v-for="(item, index) in breadcrumbs"
            :key="index"
            :to="item.name">{{ item.meta.title }}</BreadcrumbItem>
        </Breadcrumb>
        <div class="layout-content-view">
          <router-view></router-view>
        </div>
      </Content>
      <Footer class="layout-footer">2018 © 版权信息</Footer>
    </Layout>
  </Layout>
</div>
</template>

<script>
import { appRoutes } from '@SRC/configs/router/routes.js';
import LeftMenu from '@VIEWS/common/leftMenu.vue';

export default {
  components: {
    LeftMenu,
  },
  data () {
    return {
      menus: appRoutes[0]['children'],
      activeName: '',

      breadcrumbs: [],
    }
  },
  watch: {
    '$route' (newR, oldR) {
      this.activeName = newR.name;
      this.breadcrumbs = newR.matched;
    },
  },
  mounted () {
    this.activeName = this.$route.name;
    this.breadcrumbs = this.$route.matched;
  },
  methods: {
    handleMenuSelected (name) {
      this.$router.push(name);
    },
  },
}
</script>

<style lang="less">
@import '../../assets/styles/config.less';
// 放置需要重载的样式
.layout {
  .ivu-menu-vertical .ivu-menu-item-group-title {
    padding-left: 10px;
  }
  .ivu-menu-item>a {
    color: @color-content;
  }
  .ivu-menu-item-active>a,
  .ivu-menu-item-selected>a {
    color: @color-primary;
  }
}
</style>

<style lang="less" scoped>
@import '../../assets/styles/config.less';

.layout-sider {
  padding: 64px 0 0;
}

.layout-content-breadcrumb {
  margin: 15px 0;
  padding: 10px 0 10px 20px;
  background-color: @color-white;
}

.layout-content-view {
  padding: 0 20px;
}

.layout-footer {
    text-align: center;
    font-size: 12px;
    .cfg-tip-text;
}
</style>

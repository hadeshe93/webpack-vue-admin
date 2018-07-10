<!--
  侧边栏的 MENU

  结构设计：3层
  - 第一层：有可能是 MenuItem 或 MenuGroup 的 title
  - 第二层：有可能是 MenuItem 或 Submenu
  - 第三层：只可能是 MenuItem

  组件属性：Dumb 组件
  - 数据从父级传入
-->
<template lang="html">
  <Menu theme="light" :active-name="activeName" width="auto">
    <template v-for="lv1 in menuList">
      <MenuItem @click.native="handleSelect(formatUrl([lv1]))"
        :key="lv1.name" :name="lv1.name" v-if="lv1.meta.type === 'page'">
        <Icon :type="lv1.meta.icon"></Icon>
        <span class="">{{ lv1.meta.title }}</span>
      </MenuItem>
      <MenuGroup :title="lv1.meta.title" v-if="lv1.meta.type === 'menu'">
        <template v-for="lv2 in lv1.children">
          <Submenu :key="lv2.name" :name="lv2.name" v-if="lv2.meta.type === 'menu'">
            <template slot="title">
              <Icon :type="lv2.meta.icon"></Icon>
              {{ lv2.meta.title }}
            </template>
            <MenuItem @click.native="handleSelect(formatUrl([lv1, lv2, lv3]))"
              :name="lv3.name" :key="lv3.name" v-for="lv3 in lv2.children">
              <span class="">{{lv3.meta.title}}</span>
            </MenuItem>
          </Submenu>
          <MenuItem v-if="lv2.meta.type === 'page'" @click.native="handleSelect(formatUrl([lv1, lv2]))"
            :name="lv2.name">
            <Icon :type="lv2.meta.icon"></Icon>
            <span class="">{{lv2.meta.title}}</span>
          </MenuItem>
        </template>
      </MenuGroup>
    </template>
  </Menu>
</template>

<script>
export default {
  props: {
    menus: {
      type: Array,
      required: true,
      default: [],
    },
    activeName: {
      type: String,
      required: true,
      default: '',
    },
  },
  mounted () {
  },
  data () {
    return {
    }
  },
  computed: {
    menuList () {
      if (this.menus.length > 0)
        return this.menus[0].children;
      else
        return [];
    },
    menuPrefix () {
      if (this.menus.length > 0) {
        let prefix = this.menus[0].path;
        return prefix==='/'?'':prefix;
      } else {
        return '';
      }
    }
  },
  methods: {
    // 点击选择某个管理项
    handleSelect (name) {
      this.$emit('on-select', name);
    },
    // 校验权限
    checkAuth (lv) {
      if (!!lv.meta.check)
        return lv.meta.check(lv, this.manager);
      else
        return true;
    },
    // 格式化组装url
    formatUrl (lvs) {
      let menuPrefix = this.menuPrefix;
      let str = '';

      const partStrs = lvs.map(item=>{
        let q = this.$util.UtilQS.stringify(item.query);
        return item.path + (q===''?'':`?${q}`);
      });
      partStrs.unshift(menuPrefix);
      return partStrs.join('/');
    },
  },
}
</script>

<style lang="css">
</style>

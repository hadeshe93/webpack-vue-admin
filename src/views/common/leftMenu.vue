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
  <Menu theme="light" :active-name="activeName" @on-select="handleSelect" width="auto">
    <template v-for="lv1 in menus">
      <MenuItem :key="lv1.name" :name="lv1.name" v-if="lv1.meta.type === 'page'">
        <Icon :type="lv1.meta.icon"></Icon>
        <router-link :to="`/${lv1.path}`">{{ lv1.meta.title }}</router-link>
      </MenuItem>
      <MenuGroup :title="lv1.meta.title" v-if="lv1.meta.type === 'menu'">
        <template v-for="lv2 in lv1.children">
          <Submenu :key="lv2.name" :name="lv2.name" v-if="lv2.meta.type === 'menu'">
            <template slot="title">
              <Icon :type="lv2.meta.icon"></Icon>
              {{ lv2.meta.title }}
            </template>
            <MenuItem :name="lv3.name" :key="lv3.name" v-for="lv3 in lv2.children">
              <router-link :to="`/${lv1.path}/${lv2.path}/${lv3.path}`">{{ lv3.meta.title }}</router-link>
            </MenuItem>
          </Submenu>
          <MenuItem :name="lv2.name" v-if="lv2.meta.type === 'page'">
            <Icon :type="lv2.meta.icon"></Icon>
            <router-link :to="`/${lv1.path}/${lv2.path}`">{{ lv2.meta.title }}</router-link>
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
    console.log(this.activeName);
  },
  data () {
    return {
    }
  },
  methods: {
    handleSelect (name) {
      // this.$router.push(name);
      this.$emit('on-select', name);
    },
  },
}
</script>

<style lang="css">
</style>

<template>
  <a-locale-provider :locale="locale">
    <a-layout id="components-layout-demo-custom-trigger" :style="{ overflow: 'auto', height: '100vh', left: 0 }">
      <layout-sider :collapsed="collapsed"/>
      <a-layout>
        <layout-header :collapsed="collapsed" @collapsedVal="updatecollapsed"/>
        <layout-content/>
      </a-layout>
    </a-layout>
  </a-locale-provider>
</template>

<script>
  import zhCN from "ant-design-vue/lib/locale-provider/zh_CN"
  import LayoutSider from "@/components/layout/LayoutSider";
  import LayoutHeader from "@/components/layout/LayoutHeader";
  import LayoutContent from "@/components/layout/LayoutContent";

  export default {
    name: 'app',
    components: {LayoutSider, LayoutHeader, LayoutContent},
    data() {
      return {
        locale: zhCN,
        closeVisible: false,
        collapsed: false
      }
    },
    methods: {
      // 子组件传值到父类调用的方法
      updatecollapsed(collapsed) {
        this.collapsed = collapsed;
      }
    }
  }
</script>

<style>
  @import "assets/css/base.css";
</style>

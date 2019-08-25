<template>
  <a-layout-sider :trigger="null" collapsible v-model="collapsed">
    <div class="logo">

    </div>
    <a-menu theme="dark" mode="inline" :defaultSelectedKeys="['0']">
      <a-menu-item key="0">
        <a-icon type="dashboard"/>
        <span>首页</span></a-menu-item>
      <a-sub-menu key="sub1">
        <span slot="title"><a-icon type="user"/><span>权限管理</span></span>
        <a-menu-item v-on:click="clickBtn" key="1">
          <a-icon type="robot"/>
          <span>应用管理</span></a-menu-item>
        <a-menu-item key="2">
          <a-icon type="user"/>
          <span>用户管理</span>
        </a-menu-item>
        <a-menu-item key="3">
          <a-icon type="safety"/>
          <span>角色管理</span>
        </a-menu-item>
        <a-menu-item key="4">
          <a-icon type="safety"/>
          <span>权限管理</span>
        </a-menu-item>
        <a-menu-item key="5">
          <a-icon type="link"/>
          <span>菜单管理</span>
        </a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub2">
        <span slot="title"><a-icon type="laptop"/><span>字典管理</span></span>
        <a-menu-item key="6"><a-icon type="compass" /><span>省市区管理</span></a-menu-item>
        <a-menu-item key="7"><a-icon type="profile" /><span>数据字典</span></a-menu-item>
      </a-sub-menu>
      <a-menu-item key="8">
        <a-icon type="file"/>
        <span>文件管理</span>
      </a-menu-item>
      <a-menu-item key="9">
        <a-icon type="schedule" />
        <span>定时任务</span>
      </a-menu-item>
      <!--<a-sub-menu key="sub3">
          <span slot="title"><a-icon type="notification"/><span>文件管理</span></span>
          <a-menu-item key="9"><span>option9</span></a-menu-item>
          <a-menu-item key="10"><span>option10</span></a-menu-item>
          <a-menu-item key="11"><span>option11</span></a-menu-item>
          <a-menu-item key="12"><span>option12</span></a-menu-item>
      </a-sub-menu>-->
    </a-menu>
  </a-layout-sider>
</template>

<script>
    export default {
        name: "LayoutSider",
        props: ["collapsed"],
        data() {
            return {
            }
        },
        methods:{
            clickBtn(){
                console.log("click...")
            }
        }

    }
</script>

<style scoped>

</style>

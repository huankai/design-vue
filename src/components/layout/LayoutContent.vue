<template>
  <a-layout-content>
    <router-view/>
  </a-layout-content>
</template>
<script>
  export default {
    name: "LayoutContent"
  }
</script>
<style scoped>
  .ant-layout-content {
    margin: 24px 16px;
    padding: 24px;
    background: #fff;
    min-height: 280px
  }
</style>

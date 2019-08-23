<template>
  <a-layout-header style="background: #fff; padding: 0">
    <a-icon class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="collapsedClick"/>
  </a-layout-header>
</template>

<script>
    export default {
        name: "LayoutHeader",
        props: ["collapsed"],
        methods: {
            collapsedClick() {
                //组件传值到父类组件中
                this.$emit("collapsedVal", !this.collapsed);
            }
        }
    }
</script>

<style scoped>

</style>

<template>
  <a-layout-sider :trigger="null" collapsible v-model="collapsed">
    <div class="logo"></div>
    <a-menu theme="dark" mode="inline" :selectedKeys="selectedKeys" :openKeys="openKeys" @select="handleSelect"
            @openChange="openChange">
      <template v-for="item in menuList">
        <!--  注意:这里的 :key  要取 link 的值-->
        <a-menu-item v-if="item.children == null || item.children.length === 0" :key="item.link">
          <router-link :to="item.link">
            <a-icon :type="item.icon"/>
            <span>{{ item.name }}</span>
          </router-link>
        </a-menu-item>
        <!--  注意:这里的 :key  取 id 的值-->
        <a-sub-menu v-else :key="item.id">
          <span slot="title">
            <a-icon :type="item.icon"/>
            <span>{{item.name}}</span>
          </span>
          <!--  注意:这里的 :key  要取 link 的值-->
          <a-menu-item v-for="children in item.children" :key="children.link">
            <router-link :to="children.link">
              <a-icon :type="children.icon"/>
              <span>{{ children.name }}</span>
            </router-link>
          </a-menu-item>
        </a-sub-menu>
      </template>
    </a-menu>
  </a-layout-sider>
</template>
<script>
  import {getMenuList} from "@/network/menu";
  import {updateMenu} from "@/store/mutations-types";

  export default {
    name: "LayoutSider",
    props: ["collapsed"],
    data() {
      return {
        menuList: [],
        selectedKeys: [],
        openKeys: null
      }
    },
    watch: {
      // 监听route变化，设置　selectedKeys 与 openKeys 值
      "$route": "flushSider",
    },
    methods: {
      flushSider(newValue, oldValue) {
        let routes = this.$route.matched.concat();
        let path = routes.pop().path;
        if (path === "") {
          path = "/";
        }
        routes = this.$route.matched.concat();
        this.selectedKeys = [path];
        this.openKeys = this.$store.getters.getCurrentMenu;
      },
      openChange(openKeys) {
        this.openKeys = openKeys.length > 0 ? [openKeys[openKeys.length - 1]] : [];
        this.$store.commit(updateMenu, this.openKeys);
      },
      handleSelect({item, key, selectedKeys}) {
        this.selectedKeys = selectedKeys;
      }
    },
    created() {
      getMenuList().then(response => {
        if (response != null) {
          this.menuList = response;
          if (response.length > 0) {
            this.selectedKeys = [response[0].id];
          }
        }
      });
    }
  }
</script>

<style scoped>

</style>

<template>
  <a-layout-sider :trigger="null" collapsible v-model="collapsed">
    <div class="logo"></div>
    <a-menu theme="dark" mode="inline" :selectedKeys="selectedKeys"
            @select="handleSelect">
      <template v-for="item in menuList">
        <a-menu-item v-if="item.children == null || item.children.length === 0" :key="item.id">
          <router-link :to="item.link">
            <a-icon :type="item.icon"/>
            <span>{{ item.name }}</span>
          </router-link>
        </a-menu-item>
        <a-sub-menu v-else :key="item.id">
          <span slot="title">
            <a-icon :type="item.icon"/>
            <span>{{item.name}}</span>
          </span>
          <a-menu-item v-for="children in item.children" :key="children.id">
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
    import {updateMenu} from "@/store/mutations-types";
    import {getMenuList} from "@/network/menu";

    export default {
        name: "LayoutSider",
        props: ["collapsed"],
        data() {
            return {
                menuList: [],
                selectedKeys: [],
                defaultOpenKeys: []
            }
        },
        // watch: {
        //     "$route": "flushSider",
        // },
        methods: {
            // 能否通过 watch $route 来配置默认选中的 菜单???,不能拿到 menu 的 id 值，无法在 route 中的 meta 中设置
            // flushSider(newValue, oldValue) {
            //   debugger;
            // },
            handleSelect({item, key, selectedKeys}) {
                this.selectedKeys = selectedKeys;
                const currentMenu = {
                    selectedKeys: selectedKeys
                };
                let parentOpenKey = item.parentMenu.$options.propsData.eventKey;//获取上级的菜单id
                if (parentOpenKey) {//TODO 展开功能未实现
                    currentMenu.openKeys = [parentOpenKey];
                }
                this.$store.commit(updateMenu, currentMenu);
            }
        },
        created() {
            getMenuList().then(response => {
                if (response != null) {
                    this.menuList = response;
                    if (response.length > 0) {
                        let currentMenu = this.$store.getters.getCurrentMenu;
                        console.log(currentMenu);
                        if (currentMenu != null) {
                            if (currentMenu.selectedKeys != null) {
                                this.selectedKeys = currentMenu.selectedKeys;
                            }
                            if (currentMenu.openKeys != null) {
                                this.defaultOpenKeys = currentMenu.openKeys;
                            }
                        } else {
                            this.selectedKeys = [response[0].id];
                        }
                        console.log(this.defaultOpenKeys);
                    }
                }
            });
        }
    }
</script>

<style scoped>

</style>

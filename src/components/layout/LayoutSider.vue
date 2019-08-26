<template>
  <a-layout-sider :trigger="null" collapsible v-model="collapsed">
    <div class="logo"></div>
    <a-menu theme="dark" mode="inline" :selectedKeys="selectedKeys" @select="handleSelect">
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
    import {getMenuList} from "@/network/menu";
    export default {
        name: "LayoutSider",
        props: ["collapsed"],
        data() {
            return {
                menuList: [],
                selectedKeys: []
            }
        },
        methods: {
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

<template>
  <a-layout-header style="background: #fff; padding: 0">
    <a-icon class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="collapsedClick"/>
    <div class="header-right">
      <span class="header-item">
        <a-select
          showSearch
          placeholder="系统入口"
          optionFilterProp="children"
          style="width: 200px"
          :allowClear="true"
          @select="handlerAppSelect"
          :filterOption="filterOption">
          <a-select-option v-for="item in appList" :value="item.link">{{ item.name}}</a-select-option>
        </a-select>
      </span>
      <span>
          <a-avatar :size="32" icon="user" :src="'https://avatars1.githubusercontent.com/u/16852503'"/>
          <a-dropdown>
            <a class="ant-dropdown-link" href="javascript:void(0);">系统管理员&nbsp;<a-icon type="down"/>
            </a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a href="javascript:void (0);" @click="userSetting">用户设置</a>
              </a-menu-item>
              <a-menu-item>
                <a href="javascript:void (0);" @click="updatePassword">修改密码</a>
              </a-menu-item>
              <a-menu-divider/>
              <a-menu-item>
                <a href="javascript:void (0);" @click="logout">安全退出</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>
    </div>
  </a-layout-header>
</template>
<script>
    import {getHeaderAppList} from "@/network/headerApp";

    export default {
        name: "LayoutHeader",
        props: ["collapsed"],
        data() {
            return {
                appList: []
            }
        },
        created() {
            getHeaderAppList().then(response => {
                this.appList = response;
            })
        },
        methods: {
            userSetting() {
                console.log("用户设置...")
            },
            updatePassword() {
                console.log("修改密码...")
            },
            logout() {
                console.log("安全退出...")
            },
            collapsedClick() {
                //组件传值到父类组件中
                this.$emit("collapsedVal", !this.collapsed);
            },
            handlerAppSelect(value) {
                window.open(value)
            },
            filterOption(input, option) {
                return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
        }
    }
</script>

<style scoped>
  .header-right {
    float: right;
    margin-right: 20px;
  }

  .header-right .header-item {
    margin-right: 30px;
  }
</style>

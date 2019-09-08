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
      <span class="header-item">
        <a-tooltip placement="topLeft" title="待办事项">
          <a-badge :count="5">
            <a-icon type="bell" theme="twoTone"/>
          </a-badge>
        </a-tooltip>
      </span>
      <span>
          <a-avatar :size="32" icon="user" :src="userIcon"/>
          <a-dropdown>
            <a class="ant-dropdown-link" href="javascript:void(0);">系统管理员&nbsp;<a-icon type="down"/>
            </a>
            <a-menu slot="overlay">
              <a-menu-item>
                <router-link :to="'mine/settings'">用户设置</router-link>
              </a-menu-item>
              <a-menu-divider/>
              <a-menu-item>
                <a href="javascript:void (0);" @click="visible = true">安全退出</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>

      <a-modal title="安全退出" :visible="visible" @ok="logout" @cancel="visible = false">
        <p>
          <a-icon type="question-circle" :style="{color:'red',fontSize:'20px'}"/>
          确定要退出吗?
        </p>
      </a-modal>
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
        appList: [],
        userIcon: require('@/assets/image/user.png'),
        visible: false
      }
    },
    created() {
      getHeaderAppList().then(response => {
        this.appList = response.data;
      })
    },
    methods: {
      userSetting() {
        this.$message.info("该功能正在开发中...");
      },
      logout() {
        this.visible = false;
        this.$message.success("退出成功....");
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

  i.anticon {
    width: 20px;
    height: 20px;
    line-height: 20px;
    font-size: 20px;
    cursor: pointer;
  }
</style>

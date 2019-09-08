<template>
  <div class="page-header-index-wide">
    <a-card :bordered="false" :bodyStyle="{ padding: '16px 0', height: '100%' }" :style="{ height: '100%' }">
      <div class="account-settings-info-main">
        <div class="account-settings-info-left">
          <a-menu
            :style="{ border: '0', width : 'auto'}" :defaultSelectedKeys="defaultSelectedKeys"
            type="inner">
            <a-menu-item key="/mine/settings/base">
              <router-link :to="'/mine/settings/base'">
                基本设置
              </router-link>
            </a-menu-item>
            <a-menu-item key="/mine/security/security">
              <router-link :to="'/mine/settings/security'">
                安全设置
              </router-link>
            </a-menu-item>
          </a-menu>
        </div>
        <div class="account-settings-info-right">
          <div class="account-settings-info-title">
            <span>{{ $route.meta.title }}</span>
          </div>
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script>
  export default {
    name: "Mine",
    data() {
      return {
        defaultSelectedKeys: [],
      }
    },
    created() {
      this.updateMenu()
    },
    methods: {
      updateMenu() {
        const routes = this.$route.matched.concat();
        this.defaultSelectedKeys = [routes.pop().path]
      }

    }
  }
</script>

<style lang="less" scoped>
  .account-settings-info-main {
    width: 100%;
    display: flex;
    height: 100%;
    overflow: auto;

    &.mobile {
      display: block;

      .account-settings-info-left {
        border-right: unset;
        border-bottom: 1px solid #e8e8e8;
        width: 100%;
        height: 50px;
        overflow-x: auto;
        overflow-y: scroll;
      }

      .account-settings-info-right {
        padding: 20px 40px;
      }

    }

    .account-settings-info-left {
      border-right: 1px solid #e8e8e8;
      width: 224px;
    }

    .account-settings-info-right {
      flex: 1 1;
      padding: 8px 40px;

      .account-settings-info-title {
        color: rgba(0, 0, 0, .85);
        font-size: 20px;
        font-weight: 500;
        line-height: 28px;
        margin-bottom: 12px;
      }

      .account-settings-info-view {
        padding-top: 12px;
      }

    }
  }
</style>

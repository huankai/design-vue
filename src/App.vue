<template>
  <a-locale-provider :locale="locale">
    <a-layout id="components-layout-demo-custom-trigger" :style="{ overflow: 'auto', height: '100vh', left: 0 }">
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
            <a-menu-item key="6"><span>省市区管理</span></a-menu-item>
            <a-menu-item key="7"><span>数据字典</span></a-menu-item>
          </a-sub-menu>
          <a-menu-item key="8">
            <a-icon type="file"/>
            <span>文件管理</span>
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
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <a-icon class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'"
                  @click="()=> collapsed = !collapsed"/>
        </a-layout-header>
        <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }">
          <div>
            <a-row>
              <a-col :span="12">col-12</a-col>
              <a-col :span="12">col-12</a-col>
            </a-row>
            <a-divider dashed />
            <a-row>
              <a-col :span="12">col-12</a-col>
              <a-col :span="12">col-12</a-col>
            </a-row>
          </div>
          <a-pagination showSizeChanger showQuickJumper :defaultCurrent="2" :total="500" @change="onChange"/>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-locale-provider>
</template>

<script>
    import zhCN from "ant-design-vue/lib/locale-provider/zh_CN"

    const columns = [{
        title: 'name',
        dataIndex: 'name',
        width: '25%',
        scopedSlots: {customRender: 'name'},
    }, {
        title: 'age',
        dataIndex: 'age',
        width: '15%',
        scopedSlots: {customRender: 'age'},
    }, {
        title: 'address',
        dataIndex: 'address',
        width: '40%',
        scopedSlots: {customRender: 'address'},
    }, {
        title: 'operation',
        dataIndex: 'operation',
        scopedSlots: {customRender: 'operation'},
    }];
    const data = [];
    for (let i = 0; i < 7; i++) {
        data.push({
            key: i.toString(),
            name: `Hello ${i}`,
            age: i + 20,
            address: `London pack.${i}`
        });
    }
    export default {
        name: 'app',
        components: {},
        data() {
            return {
                locale: zhCN,
                collapsed: false,
                data,
                columns,
                pageSizeOptions: ['10', '20', '30', '40', '50'],
                current: 1,
                pageSize: 10,
                total: 50,
            }
        },
        methods: {
            clickBtn() {
                console.log("click...")
            },
            handleChange(value, key, column) {
                const newData = [...this.data];
                const target = newData.filter(item => key === item.key)[0];
                if (target) {
                    target[column] = value;
                    this.data = newData
                }
            },
            edit(key) {
                const newData = [...this.data];
                const target = newData.filter(item => key === item.key)[0];
                if (target) {
                    target.editable = true;
                    this.data = newData
                }
            },
            save(key) {
                const newData = [...this.data];
                const target = newData.filter(item => key === item.key)[0];
                if (target) {
                    delete target.editable;
                    this.data = newData;
                    this.cacheData = newData.map(item => ({...item}))
                }
            },
            cancel(key) {
                const newData = [...this.data];
                const target = newData.filter(item => key === item.key)[0];
                if (target) {
                    Object.assign(target, this.cacheData.filter(item => key === item.key)[0]);
                    delete target.editable;
                    this.data = newData
                }
            },
            onChange(pageNumber) {
                console.log('Page: ', pageNumber);
            },
            onShowSizeChange(current, pageSize) {

            }
        }
    }
</script>

<style>
  #components-layout-demo-custom-trigger .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color .3s;
  }

  #components-layout-demo-custom-trigger .trigger:hover {
    color: #1890ff;
  }

  #components-layout-demo-custom-trigger .logo {
    height: 32px;
    background: white;
    margin: 16px;
  }
</style>

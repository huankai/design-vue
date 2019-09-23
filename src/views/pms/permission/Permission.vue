<template>
  <div>
    <div class="search">
      <a-row>
        <a-col :span="6">
          <label>
            <span class="field">应用名称: </span>
            <a-select style="width: 60%" placeholder="请选择" :allowClear="true" v-model="params.appId"
                      @change="value => params.appId = value">
              <a-select-option v-for="item in appList" :key="item.id" :disabled="item.disabled">{{ item.name}}
              </a-select-option>
            </a-select>
          </label>
        </a-col>
        <a-col :span="6">
          <label>
            <span class="field">权限名称: </span>
            <a-input v-model="params.permissionName" placeholder="请输入权限名称"></a-input>
          </label>
        </a-col>
        <a-col :span="6">
          <div>
            <a-button type="primary" icon="search" @click="handlerSearch">搜索</a-button>
            <router-link to="/permission/add">
              <a-button type="primary" icon="plus">添加</a-button>
            </router-link>
          </div>
        </a-col>
      </a-row>
      <a-divider dashed/>
    </div>
    <div>
      <a-table rowKey="id" :columns="columns" :loading="loading" :dataSource="data"
               @change="handleChange"
               :pagination="pagination">
      <span slot="action" slot-scope="text,record">
        <router-link :to="{path:'/permission/edit',query:{id:record.id}}">
          <a-tooltip placement="topLeft" title="编辑">
            <a-icon type="edit"/>
          </a-tooltip>
        </router-link>
        <a href="javascript:void (0);" @click="showConfigResourceModal(record)">
            <a-tooltip placement="topLeft" title="配置资源">
              <a-icon type="security-scan"/>
            </a-tooltip>
        </a>
        <a href="javascript:void (0);">
          <a-popconfirm title="确定要删除吗？" placement="bottom" @confirm="handlerDelete(record)">
            <a-icon slot="icon" type="question-circle" style="color: red"/>
            <a-tooltip placement="topLeft" title="删除">
              <a-icon type="delete" :style="{color: 'red'}"/>
            </a-tooltip>
          </a-popconfirm>
        </a>
      </span>
      </a-table>
    </div>
    <a-modal title="配置资源" :visible="configResourceVisible" @ok="uploadPermissionResource"
             @cancel="configResourceVisible = false" :destroyOnClose="true" :maskClosable="false">
      <p>
        <a-tree :checkable="true" :treeData="appResourceTreeList" :checkedKeys="resourceCheckedKeys"
                @check="resourceOnCheck"
                :loadData="loadResourceData"></a-tree>
      </p>
    </a-modal>
  </div>
</template>

<script>
  import {Order, PageQuery} from "@/util/pageQuery";
  import {findTree, getSelectOption} from "@/network/clientApp";
  import {pageSizeOptions, defaultPageSize, showTotal} from "@/util/pagination";
  import {deleteById, queryForPage} from "@/network/permission";
  import {loadResourceTreeData} from "@/network/menu";

  export default {
    name: "Permission",
    data() {
      return {
        data: [],
        appList: [],
        loading: {spinning: false, tip: "加载中..."},
        params: {},
        pagination: {
          total: 0,
          defaultPageSize,
          showTotal,
          pageSizeOptions,
          showQuickJumper: true,
          showSizeChanger: true
        },
        configResourceVisible: false,
        appResourceTreeList: [],
        resourceCheckedKeys: [],
        configPermission: {}
      }
    },
    created() {
      getSelectOption().then(response => this.appList = response.data);
      this.loadingData(new PageQuery());
    },
    computed: {
      columns() {
        return [{
          title: '所属应用',
          align: 'center',
          dataIndex: 'appName',
          width: '10%'
        }, {
          title: '权限编号',
          align: 'center',
          dataIndex: 'permissionCode',
          width: '10%',
          sorter: true
        }, {
          title: '权限名称',
          align: 'center',
          dataIndex: 'permissionName',
          width: "10%"
        }, {
          title: '操作',
          scopedSlots: {
            customRender: "action"
          },
          width: "20%"
        }
        ];
      }
    },
    methods: {
      loadResourceData(treeNode) {
        debugger
        console.log(this.configPermission);
        return new Promise(resolve => {
          loadResourceTreeData(this.configPermission.appId, this.configPermission.id, treeNode.value).then(response => {
            treeNode.dataRef.children = response.data.treeData;
            this.resourceCheckedKeys = response.data.permissionResourceIds;
            this.appResourceTreeList = [...this.appResourceTreeList];
            resolve();
          })
        });
      },
      resourceOnCheck(selectedKeys) {
        this.resourceCheckedKeys = selectedKeys;
      },
      uploadPermissionResource() {

      },
      showConfigResourceModal(record) {
        this.configResourceVisible = true;
        this.configPermission = record;
        loadResourceTreeData(record.appId, record.id).then(response => {
          this.appResourceTreeList = response.data.treeData;
          this.resourceCheckedKeys = response.data.permissionResourceIds;
        });
      },
      loadingData(pageQuery) {
        this.loading.spinning = true;
        queryForPage(pageQuery)
          .then(response => {
            this.data = response.data.data;
            this.pagination.total = response.data.totalRow;
          }).finally(() => this.loading.spinning = false);
      },
      handlerDelete(record) {
        deleteById(record.id).then(response => {
          this.$message.success(response.message);
          this.loadingData(new PageQuery(this.params, this.pagination.current, this.pagination.pageSize));
        })
      },
      handlerSearch() {
        this.loadingData(new PageQuery(this.params, this.pagination.current, this.pagination.pageSize));
      },
      handleChange(pagination, filters, sorter) {
        const pager = {...this.pagination};
        pager.current = pagination.current;
        pager.pageSize = pagination.pageSize;
        this.pagination = pager;
        let orders = sorter.order ? [new Order(sorter.columnKey, sorter.order === "descend")] : [];
        this.loadingData(new PageQuery(this.params, pagination.current, pagination.pageSize, orders));
      },
    }
  }
</script>

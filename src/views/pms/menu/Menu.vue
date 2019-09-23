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
            <span class="field">资源名称: </span>
            <a-input v-model="params.resourceName" placeholder="请输入资源名称"></a-input>
          </label>
        </a-col>
        <a-col :span="6">
          <div>
            <a-button type="primary" icon="search" @click="handlerSearch">搜索</a-button>
            <router-link to="/menu/add">
              <a-button type="primary" icon="plus">添加</a-button>
            </router-link>
          </div>
        </a-col>
      </a-row>
      <a-divider dashed/>
    </div>
    <div>
      <a-row>
        <!--<a-col :span="4" style="border-right:1px dashed #e8e8e8;">
          <a-tree :treeData="treeData" :loadData="onLoadData">

          </a-tree>
        </a-col>-->
        <a-col>
          <a-table rowKey="id" :columns="columns" :loading="loading" :dataSource="data"
                   @change="handleChange"
                   :pagination="pagination">
            <span slot="action" slot-scope="text,record">
              <router-link :to="{path:'/menu/edit',query:{id:record.id}}">
                <a-tooltip placement="topLeft" title="编辑">
                  <a-icon type="edit"/>
                </a-tooltip>
              </router-link>
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
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
  import {Order, PageQuery} from "@/util/pageQuery";
  import {findTree, getSelectOption} from "@/network/clientApp";
  import {pageSizeOptions, defaultPageSize, showTotal} from "@/util/pagination";
  import {queryForPage} from "@/network/menu";
  import {findTreeListByAppId} from "@/network/menu";

  export default {
    name: "Menu",
    data() {
      return {
        treeData: [],
        appList: [],
        loading: {spinning: false, tip: "加载中..."},
        params: {},
        data: [],
        pagination: {
          total: 0,
          defaultPageSize,
          showTotal,
          pageSizeOptions,
          showQuickJumper: true,
          showSizeChanger: true
        }
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
          title: '资源名称',
          align: 'center',
          dataIndex: 'resourceName',
          width: '10%'
        }, {
          title: '地址',
          align: 'center',
          dataIndex: 'resourceUri',
          width: '10%'
        }, {
          title: '排序',
          align: 'center',
          dataIndex: 'ordered',
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
      getRootAppTreeList() {
        findTree().then(response => this.treeData = response.data);
      },
      onLoadData(treeNode) {
        return new Promise(resolve => {
          findTreeListByAppId(treeNode.value)
            .then(response => {
              treeNode.dataRef.children = response.data;
              this.treeData = [...this.treeData];
              resolve();
            })

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
        // deleteById(record.id).then(response => {
        //   this.$message.success(response.message);
        //   this.loadingData(new PageQuery(this.params, this.pagination.current, this.pagination.pageSize));
        // })
      },
      handlerSearch() {
        this.loadingData(new PageQuery(this.params, this.pagination.current, this.pagination.pageSize));
      },
      handleChange(pagination, filters, sorter) {
        const pager = { ...this.pagination };
        pager.current = pagination.current;
        pager.pageSize = pagination.pageSize;
        this.pagination= pager;
        let orders = sorter.order ? [new Order(sorter.columnKey, sorter.order === "descend")] : [];
        this.loadingData(new PageQuery(this.params, pagination.current, pagination.pageSize, orders));
      }
    }
  }
</script>

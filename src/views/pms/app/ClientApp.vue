<template>
  <div>
    <div class="search">
      <a-row>
        <a-col :span="8">
          <label>
            <span class="field">应用编号: </span>
            <a-input v-model="params.appCode" placeholder="请输入应用编号"></a-input>
          </label>
        </a-col>
        <a-col :span="8">
          <label>
            <span class="field">应用名称: </span>
            <a-input v-model="params.appName" placeholder="请输入应用编号"></a-input>
          </label>
        </a-col>
        <a-col :span="8">
          <div>
            <a-button type="primary" icon="search" @click="handlerSearch">搜索</a-button>
            <!--          <a-popconfirm title="确定要删除缓存吗？" @confirm="deleteCache">-->
            <!--            <a-icon slot="icon" type="question-circle" style="color:red"/>-->
            <!--            <a-button type="danger" :loading="deleteCacheLoading" icon="delete">清除缓存</a-button>-->
            <!--          </a-popconfirm>-->
            <router-link to="/app/add">
              <a-button type="primary" icon="plus">添加</a-button>
            </router-link>
          </div>
        </a-col>
      </a-row>
      <a-divider dashed/>
    </div>
    <a-table rowKey="id" :columns="columns" :loading="loading" :dataSource="data"
             @change="handleChange"
             :pagination="pagination">
      <span slot="appStatusRender" slot-scope="record">
          <a-tag :color="record.appStatusColor">{{record.appStatusText}}</a-tag>
      </span>
      <span slot="action" slot-scope="text,record">
        <span v-if="record.deleteStatus">
          <a href="javascript:void (0);">
            <a-popconfirm title="当前应用标记为删除，要重新生效吗？" placement="bottom" @confirm="handlerRecovery(record)">
              <a-tooltip placement="topLeft" title="重新生效">
                <a-icon type="rest" :style="{color: 'red'}"/>
              </a-tooltip>
            </a-popconfirm>
          </a>
        </span>
        <span v-else>
          <router-link :to="{path:'/app/edit',query:{id:record.id}}">
              <a-tooltip placement="topLeft" title="编辑">
                <a-icon type="edit"/>
              </a-tooltip>
          </router-link>
          <a href="javascript:void (0);">
            <a-popconfirm title="确定要禁用吗？" placement="bottom" @confirm="handlerDisable(record)"
                          v-if="record.appStatus">
              <a-tooltip placement="topLeft" title="禁用">
                <a-icon type="lock" :style="{color: 'red'}"/>
              </a-tooltip>
            </a-popconfirm>
            <a-popconfirm v-else title="确定要启用吗？" placement="bottom" @confirm="handlerEnable(record)">
              <a-tooltip placement="topLeft" title="启用">
                <a-icon type="unlock"/>
              </a-tooltip>
            </a-popconfirm>
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
          </span>
    </a-table>
  </div>
</template>

<script>
  import {deleteById, disableApp, enableApp, queryForPage, recovery} from "@/network/clientApp";
  import {Order, PageQuery} from "@/util/pageQuery";
  import {pageSizeOptions, defaultPageSize, showTotal} from "@/util/pagination";

  export default {
    name: "ClientApp",
    created() {
      let query = new PageQuery();
      query.addOrder(Order.desc("appCode"));
      this.loadingData(query);
    },
    data() {
      return {
        data: [],
        deleteCacheLoading: false,
        loading: {spinning: false, tip: "加载中..."},
        pagination: {
          total: 0,
          defaultPageSize,
          showTotal,
          pageSizeOptions,
          showQuickJumper: true,
          showSizeChanger: true
        },
        params: {
          appCode: null,
          appName: null

        }
      }
    },
    computed: {
      columns() {
        return [{
          title: '应用编号',
          align: 'center',
          dataIndex: 'appCode',
          width: '15%',
          sorter: true
        }, {
          title: '应用名称',
          align: 'center',
          dataIndex: 'appName',
          width: "15%"
        }, {
          title: '启用状态',
          align: 'center',
          width: "10%",
          key: 'appStatus',
          sorter: true,
          scopedSlots: {
            customRender: "appStatusRender"
          }
        }, {
          title: '认证类型',
          align: 'center',
          dataIndex: 'authorizedGrantTypes',
          width: "30%",
          customRender(text) {
            return text.toString();
          }
        }, {
          title: '有效期',
          dataIndex: 'expireDate',
          width: "10%",
          sorter: true,
          customRender(text) {
            return text == null ? "长期" : text;
          }
        }, {
          title: '操作',
          scopedSlots: {
            customRender: "action"
          },
          width: "10%"
        }
        ];
      }
    },
    methods: {
      loadingData(queryPage) {
        this.loading.spinning = true;
        queryForPage(queryPage).then(response => {
          this.data = response.data.data;
          this.pagination.total = response.data.totalRow;
        }).finally(() => this.loading.spinning = false);
      },
      handlerRecovery(record) {
        recovery(record.id).then(response => {
          this.$message.success(response.message);
          this.loadingData(new PageQuery());
        });
      },
      handlerDelete(record) {
        deleteById(record.id).then(response => {
          this.$message.success(response.message);
          this.loadingData(new PageQuery(this.params, this.pagination.current, this.pagination.pageSize));
        });
      },
      handlerDisable(record) {
        disableApp(record.id).then(response => {
          this.$message.info(response.message);
          this.loadingData(new PageQuery(new PageQuery(this.params, this.pagination.current, this.pagination.pageSize)));
        })
      },
      handlerEnable(record) {
        enableApp(record.id).then(response => {
          this.$message.info(response.message);
          this.loadingData(new PageQuery(new PageQuery(this.params, this.pagination.current, this.pagination.pageSize)));
        })
      },
      handlerSearch() {
        this.loadingData(new PageQuery(this.params));
      },
      dateChange(selected) {
        this.params.createDate = selected;
      },
      deleteCache() {
        this.deleteCacheLoading = true;
        const _this = this;
        setTimeout(() => {
          _this.deleteCacheLoading = false;
        }, 2000);
      },
      handleChange(pagination, filters, sorter) {
        let orders = sorter.order ? [new Order(sorter.columnKey, sorter.order === "descend")] : [];
        this.pagination.current = pagination.current;
        this.pagination.pageSize = pagination.pageSize;
        this.loadingData(new PageQuery(this.params, pagination.current, pagination.pageSize, orders));
      }
    }
  }
</script>


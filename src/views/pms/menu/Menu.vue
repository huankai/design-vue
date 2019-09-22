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
            <span class="field">名称: </span>
            <a-input v-model="params.resourceName" placeholder="请输入名称"></a-input>
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
    <a-table rowKey="id" :columns="columns" :loading="loading" :dataSource="data"
             @change="handleChange"
             :pagination="pagination">
      <span slot="action" slot-scope="text,record">
        <router-link :to="{path:'/permission/edit',query:{id:record.id}}">
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
  </div>
</template>

<script>
  import {Order, PageQuery} from "@/util/pageQuery";
  import {getSelectOption} from "@/network/clientApp";
  import {pageSizeOptions, defaultPageSize, showTotal} from "@/util/pagination";
  import {deleteById, queryForPage} from "@/network/permission";

  export default {
    name: "Menu",
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
          title: '名称',
          align: 'center',
          dataIndex: 'resourceName',
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
        let orders = sorter.order ? [new Order(sorter.columnKey, sorter.order === "descend")] : [];
        this.pagination.current = pagination.current;
        this.pagination.pageSize = pagination.pageSize;
        this.loadingData(new PageQuery(this.params, pagination.current, pagination.pageSize, orders));
      },
    }
  }
</script>

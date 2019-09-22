<template>
  <div>
    <div class="search">
      <a-row>
        <a-col :span="8">
          <label>
            <span class="field">机构编号: </span>
            <a-input v-model="params.orgCode" placeholder="请输入机构编号"></a-input>
          </label>
        </a-col>
        <a-col :span="8">
          <label>
            <span class="field">机构名称: </span>
            <a-input v-model="params.orgName" placeholder="请输入机构编号"></a-input>
          </label>
        </a-col>
        <a-col :span="8">
          <div>
            <a-button type="primary" icon="search" @click="handlerSearch">搜索</a-button>
            <router-link to="/org/add">
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
      <span slot="orgStatusRender" slot-scope="record">
          <a-tag :color="record.stateColor">{{record.stateText}}</a-tag>
      </span>
      <span slot="action" slot-scope="text,record">
        <span v-if="record.isDeleted">
          <a href="javascript:void (0);">
            <a-popconfirm title="该应用标记为删除，要重新生效吗？" placement="bottom" @confirm="handlerRecovery(record)">
              <a-tooltip placement="topLeft" title="重新生效">
                <a-icon type="rest" :style="{color: 'red'}"/>
              </a-tooltip>
            </a-popconfirm>
          </a>
        </span>
        <span v-else>
          <router-link :to="{path:'/org/edit',query:{id:record.id}}">
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
          </span>
    </a-table>
  </div>
</template>

<script>
  import {Order, PageQuery} from "@/util/pageQuery";
  import {deleteById, queryForPage, recovery} from "@/network/organization";
  import {pageSizeOptions, defaultPageSize, showTotal} from "@/util/pagination";

  export default {
    name: "Organization",
    created() {

      let query = new PageQuery();
      query.addOrder(Order.desc("orgCode"));
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
          orgCode: null,
          orgName: null

        }
      }
    },
    computed: {
      columns() {
        return [{
          title: '机构编号',
          align: 'center',
          dataIndex: 'orgCode',
          width: '15%',
          sorter: true
        }, {
          title: '机构名称',
          align: 'center',
          dataIndex: 'orgName',
          width: "15%"
        }, {
          title: '法人姓名',
          align: 'center',
          dataIndex: 'legalName',
          width: "15%"
        }, {
          title: '法人手机',
          align: 'center',
          dataIndex: 'legalPhone',
          width: "10%"
        }, {
          title: '是否有效',
          align: 'center',
          width: "10%",
          sorter: true,
          scopedSlots: {
            customRender: "orgStatusRender"
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
          this.loadingData(new PageQuery(this.params, this.pagination.current, this.pagination.pageSize));
        });
      },
      handlerDelete(record) {
        deleteById(record.id).then(response => {
          this.$message.success(response.message);
          this.loadingData(new PageQuery(this.params, this.pagination.current, this.pagination.pageSize));
        });
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
      },
      filterOption(input, option) {
        return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    }
  }
</script>


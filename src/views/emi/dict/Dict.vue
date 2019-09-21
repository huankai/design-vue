<template>
  <div>
    <div class="search">
      <a-row>
        <a-col :span="8">
          <label>
            <span class="field">编号: </span>
            <a-input v-model="params.baseCode" placeholder="请输入编号"></a-input>
          </label>
        </a-col>
        <a-col :span="8">
          <label>
            <span class="field">名称: </span>
            <a-input v-model="params.codeName" placeholder="请输入名称"></a-input>
          </label>
        </a-col>
        <a-col :span="8">
          <div>
            <a-button type="primary" icon="search" @click="handlerSearch">搜索</a-button>
            <router-link to="/dict/add">
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
      <span slot="isGbSlot" slot-scope="record">
          <a-tag v-if="record.isGb" color="blue">是</a-tag>
          <a-tag v-else color="red">否</a-tag>
      </span>
      <span slot="action" slot-scope="text,record">
        <router-link :to="{path:'/dict/edit',query:{id:record.id}}">
          <a-tooltip placement="topLeft" title="编辑">
            <a-icon type="edit"/>
          </a-tooltip>
        </router-link>
        <router-link :to="{path:'/dict/child',query:{id:record.id}}">
            <a-tooltip placement="topLeft" title="查看子级">
              <a-icon type="pic-center"/>
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
  import {queryForPage, deleteById} from "@/network/dict";
  import {Order, PageQuery} from "@/util/pageQuery";
  import {pageSizeOptions, defaultPageSize, showTotal} from "@/util/pagination";

  export default {
    name: "Dict",
    created() {
      const query = new PageQuery();
      query.param = this.params;
      this.loadingData(query);
    },
    data() {
      return {
        visible: false,
        data: [],
        searchLoading: false,
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
          baseCode: null,
          codeName: null

        }
      }
    },
    computed: {
      columns() {
        return [{
          title: '编号',
          align: 'center',
          dataIndex: 'baseCode',
          width: '15%',
          sorter: true
        }, {
          title: '名称',
          align: 'center',
          dataIndex: 'codeName',
          width: '15%'
        }, {
          title: '是否国标',
          align: 'center',
          width: '15%',
          scopedSlots: {
            customRender: 'isGbSlot'
          }
        }, {
          title: '操作',
          scopedSlots: {
            customRender: "action"
          },
          width: "25%"
        }
        ];
      }
    },
    methods: {
      dataExport() {
        this.$message.info("正在开发中...")
      },
      loadingData(queryPage) {
        this.loading.spinning = true;
        queryForPage(queryPage).then(response => {
          this.data = response.data.data;
          this.pagination.total = response.data.totalRow;
        }).finally(() => this.loading.spinning = false);
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
      handleChange(pagination, filters, sorter) {
        let orders = sorter.order ? [new Order(sorter.columnKey, sorter.order === "descend")] : [];
        this.pagination.current = pagination.current;
        this.pagination.pageSize = pagination.pageSize;
        this.loadingData(new PageQuery(this.params, pagination.current, pagination.pageSize, orders));
      }
    }
  }
</script>

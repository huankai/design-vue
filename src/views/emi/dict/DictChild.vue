<template>
  <div>
    <div class="search">
      <a-row>
        <a-col :span="8">
          <label>
            <span class="field">编号: </span>
            <a-input v-model="params.childCode" placeholder="请输入编号搜索"></a-input>
          </label>
        </a-col>
        <a-col :span="8">
          <label>
            <span class="field">名称: </span>
            <a-input v-model="params.codeName" placeholder="请输入名称搜索"></a-input>
          </label>
        </a-col>
        <a-col :span="8">
          <div>
            <a-button type="primary" icon="search" @click="searchBtn">搜索</a-button>
            <router-link :to="{path:'/childDict/add',query:{baseCodeId:this.$route.query.id}}">
              <a-button type="primary" icon="plus">添加</a-button>
            </router-link>
            <router-link to="/dict">
              <a-button type="default" icon="undo">返回</a-button>
            </router-link>
          </div>
        </a-col>
      </a-row>
      <a-divider dashed/>
    </div>
    <a-table rowKey="id" :columns="columns" :loading="loading" :dataSource="data"
             @change="handleChange"
             :pagination="pagination">
      <span slot="state" slot-scope="record">
          <a-tag v-if="record.state" color="blue">是</a-tag>
          <a-tag v-else color="red">否</a-tag>
      </span>
      <span slot="isGbSlot" slot-scope="record">
          <a-tag v-if="record.isGb" color="blue">是</a-tag>
          <a-tag v-else color="red">否</a-tag>
      </span>
      <span slot="action" slot-scope="text,record">
        <router-link :to="{path:'/childDict/edit',query:{id:record.id}}">
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
  import {queryChildForPage, findById, deleteChildById} from "@/network/dict";
  import {Order, PageQuery} from "@/util/pageQuery";

  export default {
    name: "Dict",
    created() {
      this.renderData(this.$route.query.id);
    },
    data() {
      return {
        visible: false,
        data: [],
        parentDict: null,
        searchLoading: false,
        deleteCacheLoading: false,
        loading: {spinning: false, tip: "加载中..."},
        pagination: {
          total: 0,
          defaultPageSize: 10,
          showTotal: (total, range) => {
            return "共 " + total + " 条记录";
          },
          pageSizeOptions: ['10', '20', '50', '100'],
          showQuickJumper: true,
          showSizeChanger: true
        },
        params: {
          childCode: null,
          codeName: null

        }
      }
    },
    computed: {
      columns() {
        const _this = this;
        return [{
          title: '上级名称',
          align: 'center',
          width: '15%',
          customRender: function (text, record, index) {
            return _this.parentDict.codeName;
          }
        }, {
          title: '编号',
          align: 'center',
          dataIndex: 'childCode',
          width: '15%',
          sorter: true
        }, {
          title: '名称',
          align: 'center',
          dataIndex: 'codeName',
          width: '15%'
        }, {
          title: '值',
          align: 'center',
          dataIndex: 'codeValue',
          width: '15%'
        }, {
          title: '是否国标',
          align: 'center',
          width: '10%',
          scopedSlots: {
            customRender: 'isGbSlot'
          }
        }, {
          title: '是否有效',
          align: 'center',
          width: '10%',
          scopedSlots: {
            customRender: 'state'
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
      renderData(id) {
        findById(id).then(response => {
          this.params.baseCodeId = response.data.id;
          this.parentDict = response.data;
          const query = new PageQuery();
          query.param = this.params;
          this.loadingData(query);
        });
      },
      loadingData(queryPage) {
        this.loading.spinning = true;
        queryChildForPage(queryPage).then(response => {
          this.data = response.data.data;
          this.pagination.total = response.data.totalRow;
        }).finally(() => this.loading.spinning = false);
      },
      handlerDelete(record) {
        deleteChildById(record.id)
          .then(response => {
            this.$message.success(response.message);
          }).finally(() => {
          this.loadingData(new PageQuery(this.params));
        });
      },
      searchBtn() {
        this.loadingData(new PageQuery(this.params));
      },
      handleChange(pagination, filters, sorter) {
        let orders = sorter.order ? [new Order(sorter.field, sorter.order === "descend")] : [];
        this.loadingData(new PageQuery(this.params, pagination.current, pagination.pageSize, orders));
      }
    }
  }
</script>

<style scoped>

</style>

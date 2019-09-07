<template>
  <div>
    <div class="search">
      <a-row>
        <a-col :span="6">
          <label>
            <span class="field">应用名称: </span>
            <a-select style="width: 50%">
              <a-select-option v-for="item in appList" :key="item.id" :disabled="item.disabled">{{ item.name}}</a-select-option>
            </a-select>
          </label>
        </a-col>
        <a-col :span="6">
          <label>
            <span class="field">角色名称: </span>
            <a-input placeholder="请输入角色名称"></a-input>
          </label>
        </a-col>
        <a-col :span="6">
          <div>
            <a-button type="primary" icon="search" @click="handlerSearch">搜索</a-button>
            <router-link to="/role/add">
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

    </a-table>
  </div>
</template>

<script>
  import {Order, PageQuery} from "@/util/pageQuery";

  export default {
    name: "Role",
    data() {
      return {
        data: [],
        appList:[
          {
            id:"1",
            disabled: true,
            name:"字典管理系统"
          },{
            id:"2",
            name:"文件管理系统"
          },{
            id:"3",
            name:"权限管理系统"
          }
        ],
        loading: {spinning: false, tip: "加载中..."},
        params: {},
        pagination: {
          total: 0,
          defaultPageSize: 10,
          showTotal: (total, range) => {
            return "共 " + total + " 条记录";
          },
          pageSizeOptions: ['10', '20', '50', '100'],
          showQuickJumper: true,
          showSizeChanger: true
        }
      }
    },
    created() {
    },
    computed: {
      columns() {
        return [{
          title: '角色编号',
          align: 'center',
          dataIndex: 'roleCode',
          width: '10%',
          sorter: true
        }, {
          title: '角色名称',
          align: 'center',
          dataIndex: 'roleName',
          width: "10%"
        }, {
          title: '是否有效',
          align: 'center',
          dataIndex: 'realName',
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
      handlerSearch() {
        this.loadingData(new PageQuery(this.params));
      },
      handleChange(pagination, filters, sorter) {
        let orders = sorter.order ? [new Order(sorter.columnKey, sorter.order === "descend")] : [];
        this.loadingData(new PageQuery(this.params, pagination.current, pagination.pageSize, orders));
      },
    }
  }
</script>

<style scoped>

</style>

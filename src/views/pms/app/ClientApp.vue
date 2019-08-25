<template>
  <div class="search">
    <a-row>
      <date-search :showTime="false" :showToday="true" :dateName="'创建时间'"
                   @dateChange="dateChange"/>
    </a-row>
    <a-divider dashed/>
    <a-row>
      <a-col :span="8">
        <label>
          <span class="field">应用编号: </span>
          <a-input placeholder="请输入应用编号搜索"></a-input>
        </label>
      </a-col>
      <a-col :span="8">
        <label>
          <span class="field">应用名称: </span>
          <a-input placeholder="请输入应用编号搜索"></a-input>
        </label>
      </a-col>
      <a-col :span="8">
        <div>
          <a-button type="primary" icon="search" @click="searchBtn">搜索</a-button>
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

    <div>
      <a-table rowKey="id" :columns="columns" :loading="loading" :dataSource="data"
               @change="handleChange"
               :pagination="pagination">
          <span slot="action" slot-scope="text,record">
<!--            <a href="javascript:void (0);" @click="handlerEdit(record)">-->
            <router-link :to="{path:'/app/edit',query:{id:record.id}}">
                <a-tooltip placement="topLeft" title="编辑">
                  <a-icon type="edit"/>
                </a-tooltip>
            </router-link>
            <!--            </a>-->
            <a href="javascript:void (0);">
              <a-popconfirm title="确定要删除吗？" placement="bottom" @confirm="handlerDelete(record)">
                <a-tooltip placement="topLeft" title="删除">
                  <a-icon type="delete" :style="{color: 'red'}"/>
                </a-tooltip>
              </a-popconfirm>
            </a>

          </span>
      </a-table>
    </div>
  </div>
</template>

<script>
    import DateSearch from "@/components/search/DateSearch";

    const data = [{
        id: 1,
        appCode: 'PMS',
        appName: "统一权限管理",
        startDate: "2018-01-01",
        expireDate: "长期"
    }, {
        id: 2,
        appCode: 'EMI',
        appName: "统一字典管理",
        startDate: "2018-01-01",
        expireDate: "长期"
    }, {
        id: 3,
        appCode: 'FS',
        appName: "统一文件管理",
        startDate: "2018-01-01",
        expireDate: "长期"
    }
    ];

    export default {
        name: "ClientApp",
        components: {DateSearch},
        data() {
            return {
                data,
                deleteCacheLoading: false,
                loading: false,
                pagination: {
                    total: data.length,
                    defaultPageSize: 10,
                    showTotal: (total, range) => {
                        return "共 " + total + " 条记录";
                    },
                    pageSizeOptions: ['10', '20', '50', '100'],
                    showQuickJumper: true,
                    showSizeChanger: true
                },
                params: {
                    userName: null,
                    userType: null,
                    userType2: null,
                    userType3: 1

                }
            }
        },
        computed: {
            columns() {
                let {sortedInfo, filteredInfo} = this;
                sortedInfo = sortedInfo || {};
                filteredInfo = filteredInfo || {};
                return [{
                    title: '应用编号',
                    align: 'center',
                    dataIndex: 'appCode',
                    width: 150
                    // sorter: (a, b) => a.age - b.age
                }, {
                    title: '应用名称',
                    align: 'center',
                    dataIndex: 'appName',
                    width: 150
                }, {
                    title: '有效期',
                    dataIndex: 'expireDate',
                    width: 400
                }, {
                    title: '操作',
                    scopedSlots: {
                        customRender: "action"
                    },
                    width: 400
                }
                ];
            }
        },
        methods: {
            handlerDelete(record) {
                let index = this.data.indexOf(record);
                if (index !== -1) {
                    this.data.splice(index, 1);
                    this.pagination.total = this.data.length;
                    this.$message.success("删除成功");
                }
            },
            searchBtn() {
                console.log(this.params);
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
            onChange() {

            },
            handleChange(value) {
                console.log(`selected ${value}`);
            },
            handleBlur() {
                console.log('blur');
            },
            handleFocus() {
                console.log('focus');
            },
            filterOption(input, option) {
                return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
        }
    }
</script>

<style scoped>

</style>

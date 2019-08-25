<template>
  <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }">
    <div class="search">
      <a-row>
        <date-search :showTime="false" :showToday="true" :dateName="'创建时间'"
                     @dateChange="dateChange"/>
        <!--        :dateRanges="['TD','YD','CUSTOM']"-->
      </a-row>
      <a-divider dashed/>
      <a-row>
        <a-col :span="8">
          <label>
            <span class="field">用户名: </span>
            <a-input v-model="params.userName" placeholder="请输入用户名搜索"></a-input>
          </label>
        </a-col>
        <a-col :span="8">
          <label>
            <span class="field">用户类型: </span>
            <a-input v-model="params.userType" placeholder="用户类型"></a-input>
          </label>
        </a-col>
        <a-col :span="8">
          <label>
            <span class="field">用户类型: </span>
            <a-input v-model="params.userType2" placeholder="用户类型"></a-input>
          </label>
        </a-col>
      </a-row>
      <a-divider dashed/>
      <a-row>
        <a-col :span="8">
          <label>
            <span class="field">用户类型2: </span>
            <a-select v-model="params.userType3"
                      showSearch
                      placeholder="请输入关键字搜索"
                      optionFilterProp="children"
                      style="width: 50%"
                      :allowClear="true"
                      @focus="handleFocus"
                      @blur="handleBlur"
                      @change="handleChange"
                      :filterOption="filterOption"
            >
              <a-select-option :value=1>普通用户</a-select-option>
              <a-select-option :value=2>管理员</a-select-option>
              <a-select-option :value=3>其它</a-select-option>
            </a-select>
          </label>
        </a-col>
        <a-col :span="8">
          <div>
            <a-button type="primary" icon="search" @click="searchBtn">搜索</a-button>
            <a-popconfirm title="确定要删除缓存吗？" @confirm="deleteCache">
              <a-icon slot="icon" type="question-circle" style="color:red"/>
              <a-button type="danger" :loading="deleteCacheLoading" icon="delete">清除缓存</a-button>
            </a-popconfirm>
            <a-button type="primary" icon="plus">添加</a-button>
          </div>
        </a-col>
      </a-row>
      <a-divider dashed/>
    </div>
    <div>
      <a-table rowKey="id" :rowSelection="rowSelection" :columns="columns" :loading="loading" :dataSource="data"
               @change="handleChange"
               :pagination="pagination">
          <span slot="action" slot-scope="text,record">
            <a href="javascript:void (0);" @click="handlerEdit(record)">
              <a-tooltip placement="topLeft" title="编辑">
                <a-icon type="edit"/>
              </a-tooltip>
            </a>
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

    <!--    <a-pagination showSizeChanger showQuickJumper :defaultCurrent="2" :total="50"-->
    <!--                  :pageSizeOptions="['10','20','50','100']" @change="onChange"/>-->
  </a-layout-content>

</template>

<script>
    import DateSearch from "@/components/search/DateSearch";

    const data = [{
        id: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
    }, {
        id: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
    }, {
        id: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
    }, {
        id: '4',
        name: 'Jim Red',
        age: 32,
        address: 'London No. 2 Lake Park',
    }, {
        id: '5',
        name: 'Jim Red',
        age: 32,
        address: 'London No. 2 Lake Park',
    }, {
        id: '6',
        name: 'Jim Red',
        age: 32,
        address: 'London No. 2 Lake Park',

    }, {
        id: '7',
        name: 'Jim Red',
        age: 32,
        address: 'London No. 2 Lake Park',
    }, {
        id: '8',
        name: 'Jim Red',
        age: 32,
        address: 'London No. 2 Lake Park',
    }, {
        id: '9',
        name: 'Jim Red',
        age: 32,
        address: 'London No. 2 Lake Park',
    }, {
        id: '10',
        name: 'Jim Red',
        age: 32,
        address: 'London No. 2 Lake Park',
    }, {
        id: '11',
        name: 'Jim Red',
        age: 32,
        address: 'London No. 2 Lake Park',
    }
    ];

    export default {
        name: "LayoutContent",
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
            rowSelection() {
                const {selectedRowKeys} = this;
                return {
                    onChange: (selectedRowKeys, selectedRows) => {
                        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                    },
                    getCheckboxProps: record => ({
                        props: {
                            disabled: record.name === 'Disabled User', // Column configuration not to be checked
                            name: record.name,
                        }
                    }),
                }
            },
            columns() {
                let {sortedInfo, filteredInfo} = this;
                sortedInfo = sortedInfo || {};
                filteredInfo = filteredInfo || {};
                return [{
                    title: '姓名',
                    align: 'center',
                    dataIndex: 'name',
                    width: 150
                }, {
                    title: '年龄',
                    align: 'center',
                    dataIndex: 'age',
                    width: 150,
                    sorter: (a, b) => a.age - b.age
                }, {
                    title: '地址',
                    dataIndex: 'address',
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
            handlerEdit(record) {
                console.log(record);
            },
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

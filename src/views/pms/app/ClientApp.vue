<template>
  <div>
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
            <a-input v-model="params.appCode" placeholder="请输入应用编号搜索"></a-input>
          </label>
        </a-col>
        <a-col :span="8">
          <label>
            <span class="field">应用名称: </span>
            <a-input v-model="params.appName" placeholder="请输入应用编号搜索"></a-input>
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
    </div>
    <a-table rowKey="id" :columns="columns" :loading="loading" :dataSource="data"
             @change="handleChange"
             :pagination="pagination">
          <span slot="action" slot-scope="text,record">
            <router-link :to="{path:'/app/edit',query:{id:record.id}}">
                <a-tooltip placement="topLeft" title="编辑">
                  <a-icon type="edit"/>
                </a-tooltip>
            </router-link>
            <router-link :to="{path:'/app/details',query:{id:record.id}}">
                <a-tooltip placement="topLeft" title="详情">
                  <a-icon type="eye"/>
                </a-tooltip>
            </router-link>
            <a href="javascript:void (0);">
              <a-popconfirm title="确定要禁用吗？" placement="bottom" @confirm="handlerDisable(record)"
                            v-if="record.appStatus === 1">
                <a-tooltip placement="topLeft" title="禁用">
                  <a-icon type="lock"/>
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
    </a-table>
  </div>
</template>

<script>
    import DateSearch from "@/components/search/DateSearch";
    import {queryForPage} from "@/network/clientApp";
    import {Order, PageQuery} from "@/util/pageQuery";

    export default {
        name: "ClientApp",
        components: {DateSearch},
        created() {
            let query = new PageQuery();
            query.addOrder(Order.desc("appCode"));
            console.log(query);
            queryForPage(query).then(response => {
                this.data = response.data;
                this.pagination.total = response.totalRow;
            });
        },
        data() {
            return {
                data: [],
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
                    width: '8%'
                    // sorter: (a, b) => a.age - b.age
                }, {
                    title: '应用名称',
                    align: 'center',
                    dataIndex: 'appName',
                    width: "15%"
                }, {
                    title: '状态',
                    align: 'center',
                    dataIndex: 'appStatusText',
                    width: "10%"
                }, {
                    title: '认证类型',
                    align: 'center',
                    dataIndex: 'authorizedGrantTypes',
                    width: "37%"
                }, {
                    title: '有效期',
                    dataIndex: 'expireDate',
                    width: "13%"
                }, {
                    title: '操作',
                    scopedSlots: {
                        customRender: "action"
                    },
                    width: "22%"
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
            handlerDisable() {

            },
            handlerEnable() {

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
            handleChange(pagination, filters, sorter) {
                console.log(pagination);
                console.log(filters);
                // console.log(`sorter ${sorter}`);
                console.log(sorter);
                this.loading.spinning = true;
                setTimeout(() => {
                    this.loading.spinning = false;
                }, 200);
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


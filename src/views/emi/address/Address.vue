<template>
  <div>
    <div class="search">
      <a-row>
        <a-col :span="8">
          <label>
            <span class="field">编号: </span>
            <a-input v-model="params.code" placeholder="请输入名称搜索"></a-input>
          </label>
        </a-col>
        <a-col :span="8">
          <label>
            <span class="field">名称: </span>
            <a-input v-model="params.fullName" placeholder="请输入名称搜索"></a-input>
          </label>
        </a-col>
        <a-col :span="8">
          <div>
            <a-button type="primary" icon="search" @click="searchBtn">搜索</a-button>
            <a-button type="primary" icon="select" @click="searchBtn">导出</a-button>
            <router-link to="/address/add">
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
        <router-link :to="{path:'/address/edit',query:{id:record.id}}">
          <a-tooltip placement="topLeft" title="编辑">
            <a-icon type="edit"/>
          </a-tooltip>
        </router-link>
        <router-link :to="{path:'/address/detail',query:{id:record.id}}">
          <a-tooltip placement="topLeft" title="详情">
            <a-icon type="eye"/>
          </a-tooltip>
        </router-link>
        <router-link :to="{path:'/address/child',query:{id:record.id,jobName:record.jobName}}">
            <a-tooltip placement="topLeft" title="查看子级">
              <a-icon type="pic-center" />
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
    import {queryForPage} from "@/network/address";
    import {Order, PageQuery} from "@/util/pageQuery";

    export default {
        name: "Address",
        created() {
            let query = new PageQuery();
            queryForPage(query).then(response => {
                this.data = response.data;
                this.pagination.total = response.totalRow;
            });
        },
        data() {
            return {
                data: [],
                stateList: [
                    {name: "启用", value: 1},
                    {name: "停止", value: 2},
                    {name: "删除", value: 0}
                ],
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
                    code: null,
                    fullName: null,
                    createdDate: null

                }
            }
        },
        computed: {
            columns() {
                return [{
                    title: '编号',
                    align: 'center',
                    dataIndex: 'code',
                    width: '15%'
                    // sorter: (a, b) => a.age - b.age
                }, {
                    title: '名称',
                    align: 'center',
                    dataIndex: 'fullName',
                    width: '15%'
                    // sorter: (a, b) => a.age - b.age
                }, {
                    title: '邮编',
                    align: 'center',
                    dataIndex: 'postOffice',
                    width: "15%"
                }, {
                    title: '经度',
                    align: 'center',
                    dataIndex: 'longitude',
                    width: "15%"
                }, {
                    title: '纬度',
                    align: 'center',
                    dataIndex: 'latitude',
                    width: "15%",
                },{
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
            handleStateChange(value) {
                this.params.state = value;
            },
            searchBtn() {
                console.log(this.params);
                this.$message.info("code:" + this.params.code + ",  fullName:"
                    + this.params.fullName);
            },
            dateChange(selected) {
                this.params.createdDate = selected;
            },
            deleteCache() {
                this.deleteCacheLoading = true;
                const _this = this;
                setTimeout(() => {
                    _this.deleteCacheLoading = false;
                }, 2000);
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
            filterOption(input, option) {
                return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
        }
    }
</script>

<style scoped>

</style>

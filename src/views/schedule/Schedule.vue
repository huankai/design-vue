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
            <span class="field">任务名称: </span>
            <a-input v-model="params.jobName" placeholder="请输入任务名称搜索"></a-input>
          </label>
        </a-col>
        <a-col :span="8">
          <label>
            <span class="field">状态: </span>
            <a-select
              showSearch
              placeholder="状态"
              optionFilterProp="children"
              style="width: 200px"
              :allowClear="true"
              @change="handleStateChange"
              :filterOption="filterOption">
              <a-select-option v-for="item in stateList" :value="item.value">{{ item.name}}</a-select-option>
            </a-select>
          </label>
        </a-col>
        <a-col :span="8">
          <div>
            <a-button type="primary" icon="search" @click="searchBtn">搜索</a-button>
            <!--          <a-popconfirm title="确定要删除缓存吗？" @confirm="deleteCache">-->
            <!--            <a-icon slot="icon" type="question-circle" style="color:red"/>-->
            <!--            <a-button type="danger" :loading="deleteCacheLoading" icon="delete">清除缓存</a-button>-->
            <!--          </a-popconfirm>-->
            <router-link to="/schedule/add">
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
      <span slot="state" slot-scope="record">
          <a-tag :color="record.color">{{record.stateText}}</a-tag>
      </span>
      <span slot="action" slot-scope="text,record">
        <router-link :to="{path:'/schedule/edit',query:{id:record.id}}">
          <a-tooltip placement="topLeft" title="编辑">
            <a-icon type="edit"/>
          </a-tooltip>
        </router-link>
        <router-link :to="{path:'/schedule/detail',query:{id:record.id}}">
          <a-tooltip placement="topLeft" title="详情">
            <a-icon type="eye"/>
          </a-tooltip>
        </router-link>
        <a href="javascript:void (0);">
          <a-popconfirm title="确定要暂停吗？" placement="bottom" @confirm="handlerDisable(record)">
            <a-tooltip placement="topLeft" title="暂停">
              <a-icon type="pause-circle"/>
            </a-tooltip>
          </a-popconfirm>
        </a>
        <a href="javascript:void (0);">
            <a-popconfirm title="确定要恢复吗？" placement="bottom" @confirm="handlerDisable(record)">
              <a-tooltip placement="topLeft" title="恢复">
                <a-icon type="play-circle"/>
              </a-tooltip>
            </a-popconfirm>
        </a>
        <a href="javascript:void (0);">
          <a-popconfirm title="确定要执行吗？" placement="bottom" @confirm="handlerDisable(record)">
            <a-tooltip placement="topLeft" title="执行">
              <a-icon type="sync" :spin="true"/>
            </a-tooltip>
          </a-popconfirm>
        </a>

        <router-link :to="{path:'/schedule/log',query:{id:record.id,jobName:record.jobName}}">
            <a-tooltip placement="topLeft" title="查看日志">
              <a-icon type="message"/>
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
    import DateSearch from "@/components/search/DateSearch";
    import {queryForPage} from "@/network/schedule";
    import {Order, PageQuery} from "@/util/pageQuery";

    export default {
        name: "Schedule",
        components: {DateSearch},
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
                    jobName: null,
                    state: null,
                    createdDate: null

                }
            }
        },
        computed: {
            columns() {
                return [{
                    title: '名称',
                    align: 'center',
                    dataIndex: 'jobName',
                    width: '15%'
                    // sorter: (a, b) => a.age - b.age
                }, {
                    title: '组名',
                    align: 'center',
                    dataIndex: 'jobGroup',
                    width: '10%'
                    // sorter: (a, b) => a.age - b.age
                }, {
                    title: 'bean名称',
                    align: 'center',
                    dataIndex: 'beanName',
                    width: "10%"
                }, {
                    title: 'cron 表达式',
                    align: 'center',
                    dataIndex: 'cronExpression',
                    width: "15%"
                }, {
                    title: '状态',
                    width: "5%",
                    scopedSlots: {
                        customRender: 'state'
                    }
                }, {
                    title: '创建时间',
                    align: 'center',
                    dataIndex: 'createdDate',
                    width: "20%"
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
                this.$message.info("jobName:" + this.params.jobName + ",  state:"
                    + this.params.state);
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

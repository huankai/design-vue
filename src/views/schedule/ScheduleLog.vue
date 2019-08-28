<template>
  <div>
    <div>
      <a-row>
        <a-col :span="8">
          <a-form-item :label-col="{span: 8}" :wrapper-col="{span:16}" label="任务名称">{{this.$route.query.jobName}}
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label-col="{span: 8}" :wrapper-col="{span:16}" label="cron表达式">*/5 * * * * ?</a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label-col="{span: 8}" :wrapper-col="{span:16}" label="任务状态">已启动</a-form-item>
        </a-col>
      </a-row>
    </div>
    <a-divider dashed/>
    <div class="search">
      <a-row>
        <date-search :showTime="false" :showToday="true" :dateName="'执行时间'"
                     @dateChange="dateChange"/>
      </a-row>
      <a-divider dashed/>
      <a-row>
        <a-col :span="8">
          <label>
            <span class="field">状态: </span>
            <a-select
              showSearch
              placeholder="状态"
              optionFilterProp="children"
              style="width: 200px"
              :allowClear="true">
              <a-select-option v-for="item in stateList" :value="item.value">{{ item.name}}</a-select-option>
            </a-select>
          </label>
        </a-col>
        <a-col :span="8">
          <div>
            <a-button type="primary" icon="search" @click="handerSearch">搜索</a-button>
            <router-link to="/schedule">
              <a-button type="default">
                <a-icon type="undo"/>
                返回
              </a-button>
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
      <span slot="success" slot-scope="record">
        <a-tag v-if="record" color="blue">成功</a-tag>
        <a-tag v-else color="red">失败</a-tag>
      </span>
    </a-table>
  </div>
</template>

<script>
    import DateSearch from "@/components/search/DateSearch";
    import {queryForLogPage} from "@/network/schedule";
    import {Order, PageQuery} from "@/util/pageQuery";

    export default {
        name: "ScheduleLog",
        components: {DateSearch},
        data() {
            return {
                data: [],
                stateList: [
                    {name: "成功", value: true},
                    {name: "失败", value: false}
                ],
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
            }
        },
        created() {
            let query = new PageQuery();
            console.log("-->:", this.$route.params.id);
            queryForLogPage(query).then(response => {
                this.data = response.data;
                console.log(response.data);
                this.pagination.total = response.totalRow;
            });
        },
        computed: {
            columns() {
                return [{
                    title: '执行时间',
                    align: 'center',
                    dataIndex: 'startDate',
                    width: '20%'
                    // sorter: (a, b) => a.age - b.age
                }, {
                    title: '耗时(分)',
                    align: 'center',
                    dataIndex: 'takeTime',
                    width: '10%'
                    // sorter: (a, b) => a.age - b.age
                }, {
                    title: '状态',
                    align: 'center',
                    dataIndex: 'success',
                    width: "5%",
                    scopedSlots: {
                        customRender: "success"
                    }

                }, {
                    title: '消息',
                    align: 'center',
                    dataIndex: 'message',
                    width: "65%"
                }
                ];
            }
        },
        methods: {
            dateChange(selected) {
                this.$message.info(selected.range);
            },
            handerSearch() {
                this.$message.info("该功能正在开发中...");
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
            }
        }
    }
</script>

<style scoped>

</style>

<template>
  <div>
    <div>
      <a-row>
        <a-col :span="8">
          <a-form-item :label-col="{span: 8}" :wrapper-col="{span:16}" label="任务名称">{{ schedule.jobName}}
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label-col="{span: 8}" :wrapper-col="{span:16}" label="cron表达式">{{ schedule.cronExpression }}
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label-col="{span: 8}" :wrapper-col="{span:16}" label="任务状态">{{ schedule.stateText}}
          </a-form-item>
        </a-col>
      </a-row>
    </div>
    <a-divider dashed/>
    <div class="search">
      <date-search :showTime="false" :showToday="true" :label="'执行时间'"
                   @dateChange="dateChange"/>
      <a-row>
        <a-col :span="8">
          <label>
            <span class="field">状态: </span>
            <a-select
              showSearch
              placeholder="状态"
              optionFilterProp="children"
              style="width: 200px"
              @change="handleStateChange"
              :allowClear="true">
              <a-select-option v-for="item in stateList" :value="item.value">{{ item.name}}</a-select-option>
            </a-select>
          </label>
        </a-col>
        <a-col :span="8">
          <div>
            <a-button type="primary" icon="search" @click="handlerSearch">搜索</a-button>
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
  import {findById, queryForLogPage} from "@/network/schedule";
  import {ConditionParam, DateRangeCondition, Order, PageQuery, SimpleCondition} from "@/util/pageQuery";
  import {pageSizeOptions, defaultPageSize, showTotal} from "@/util/pagination";

  export default {
    name: "ScheduleLog",
    components: {DateSearch},
    data() {
      return {
        data: [],
        schedule: {},
        stateList: [
          {name: "成功", value: 1},
          {name: "失败", value: 0}
        ],
        params: new ConditionParam([new SimpleCondition("jobId", null), new SimpleCondition("success", null)],
          [new DateRangeCondition(null, "startDate")]),
        loading: false,
        pagination: {
          total: 0,
          defaultPageSize,
          showTotal,
          pageSizeOptions,
          showQuickJumper: true,
          showSizeChanger: true
        },
      }
    },
    created() {
      findById(this.$route.query.id).then(response => {
        this.schedule = response.data;
        this.params.updateSimpleValue("jobId", response.data.id);
        let pageQuery = new PageQuery(this.params);
        pageQuery.addOrder(new Order("startDate", true));
        this.loadingData(pageQuery);
      });
    },
    computed: {
      columns() {
        return [{
          title: '执行时间',
          align: 'center',
          dataIndex: 'startDate',
          width: '20%',
          sorter: true
        }, {
          title: '耗时(分)',
          align: 'center',
          dataIndex: 'takeTime',
          width: '10%'
        }, {
          title: '状态',
          align: 'center',
          dataIndex: 'success',
          width: "10%",
          scopedSlots: {
            customRender: "success"
          }

        }, {
          title: '消息',
          align: 'center',
          dataIndex: 'message',
          width: "60%"
        }
        ];
      }
    },
    methods: {
      dateChange(selected) {
        this.params.updateDateRangeValue("startDate", selected);
      },
      handleStateChange(value) {
        this.params.updateSimpleValue("success", value);
      },
      handlerSearch() {
        this.loadingData(new PageQuery(this.params));
      },
      loadingData(pageQuery) {
        this.loading = true;
        queryForLogPage(pageQuery).then(response => {
          this.data = response.data.data;
          this.pagination.total = response.data.totalRow;
        }).finally(() => this.loading = false);
      },
      handleChange(pagination, filters, sorter) {
        let orders = sorter.order ? [new Order(sorter.columnKey, sorter.order === "descend")] : [];
        this.loadingData(new PageQuery(this.params, pagination.current, pagination.pageSize, orders));
      }
    }
  }
</script>

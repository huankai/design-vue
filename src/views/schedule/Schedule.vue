<template>
  <div>
    <div class="search">
      <a-row>
        <a-col :span="8">
          <label>
            <span class="field">任务名称: </span>
            <a-input v-model="params.jobName" placeholder="请输入任务名称"></a-input>
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
              :value="params.state"
              :filterOption="filterOption">
              <a-select-option v-for="item in stateList" :value="item.value">{{ item.name}}</a-select-option>
            </a-select>
          </label>
        </a-col>
        <a-col :span="8">
          <div>
            <a-button type="primary" icon="search" @click="handlerSearch">搜索</a-button>
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
          <a-tag :color="record.stateColor">{{record.stateText}}</a-tag>
      </span>
      <span slot="action" slot-scope="text,record">
        <router-link :to="{path:'/schedule/edit',query:{id:record.id}}">
          <a-tooltip placement="topLeft" title="编辑">
            <a-icon type="edit"/>
          </a-tooltip>
        </router-link>
        <a href="javascript:void (0);" v-if="record.state !== 2">
          <a-popconfirm title="确定要暂停吗？" placement="bottom" @confirm="handlerPause(record)">
            <a-tooltip placement="topLeft" title="暂停">
              <a-icon type="pause-circle"/>
            </a-tooltip>
          </a-popconfirm>
        </a>
        <a v-else href="javascript:void (0);">
            <a-popconfirm title="确定要恢复吗？" placement="bottom" @confirm="handlerResume(record)">
              <a-tooltip placement="topLeft" title="恢复">
                <a-icon type="play-circle"/>
              </a-tooltip>
            </a-popconfirm>
        </a>
        <a href="javascript:void (0);">
          <a-popconfirm title="确定要立即执行吗？" placement="bottom" @confirm="handlerTrigger(record)">
            <a-tooltip placement="topLeft" title="立即执行">
              <a-icon type="sync" :spin="true"/>
            </a-tooltip>
          </a-popconfirm>
        </a>

        <router-link :to="{path:'/schedule/log',query:{id:record.id}}">
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
  import {deleteById, pause, queryForPage, resume, trigger} from "@/network/schedule";
  import {Order, PageQuery} from "@/util/pageQuery";
  import {pageSizeOptions, defaultPageSize, showTotal} from "@/util/pagination";

  export default {
    name: "Schedule",
    created() {
      this.loadingData(new PageQuery());
    },
    data() {
      return {
        data: [],
        stateList: [
          {name: "启用", value: 1},
          {name: "停止", value: 2},
          {name: "删除", value: 0}
        ],
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
          jobName: null,
          state: null
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
        }, {
          title: '组名',
          align: 'center',
          dataIndex: 'jobGroup',
          width: '10%'
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
        deleteById(record.id).then(response => {
          this.$message.success(response.message);
        }).finally(() => {
          this.loadingData(new PageQuery(this.params, this.pagination.current, this.pagination.pageSize));
        });
      },
      loadingData(queryPage) {
        this.loading.spinning = true;
        queryForPage(queryPage).then(response => {
          this.data = response.data.data;
          this.pagination.total = response.data.totalRow;
        }).finally(() => this.loading.spinning = false);
      },
      handlerPause(record) {
        pause(record.id).then(response => {
          this.$message.success(response.message);
          this.loadingData(new PageQuery(this.params, this.pagination.current, this.pagination.pageSize));
        });
      },
      handlerResume(record) {
        resume(record.id).then(response => {
          this.$message.success(response.message);
          this.loadingData(new PageQuery(this.params, this.pagination.current, this.pagination.pageSize));
        });
      },
      handlerTrigger(record) {
        trigger(record.id).then(response => {
          this.$message.success(response.message);
          this.loadingData(new PageQuery(this.params, this.pagination.current, this.pagination.pageSize));
        });
      },
      handleStateChange(value) {
        this.params.state = value;
      },
      handlerSearch() {
        this.loadingData(new PageQuery(this.params));
      },
      handleChange(pagination, filters, sorter) {
        let orders = sorter.order ? [new Order(sorter.columnKey, sorter.order === "descend")] : [];
        this.pagination.current = pagination.current;
        this.pagination.pageSize = pagination.pageSize;
        this.loadingData(new PageQuery(this.params, pagination.current, pagination.pageSize, orders));
      },
      filterOption(input, option) {
        return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    }
  }
</script>

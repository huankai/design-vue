<template>
  <div>
    <div class="search">
      <date-search :showTime="false" :showToday="true" :label="'上传时间'"
                   @dateChange="dateChange"/>
      <a-row>
        <a-col :span="8">
          <label>
            <span class="field">文件名: </span>
            <a-input @change="e => this.params.updateSimpleValue('fileName',e.target.value)"
                     placeholder="请输入文件名"></a-input>
          </label>
        </a-col>
        <a-col :span="8">
          <div>
            <a-button type="primary" icon="search" @click="handlerSearch">搜索</a-button>
            <!--          <a-popconfirm title="确定要删除缓存吗？" @confirm="deleteCache">-->
            <!--            <a-icon slot="icon" type="question-circle" style="color:red"/>-->
            <!--            <a-button type="danger" :loading="deleteCacheLoading" icon="delete">清除缓存</a-button>-->
            <!--          </a-popconfirm>-->
            <router-link to="/file/add">
              <a-button type="primary" icon="upload">上传</a-button>
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
            <!--<router-link :to="{path:'/files/details',query:{id:record.id}}">
                <a-tooltip placement="topLeft" title="详情">
                  <a-icon type="eye"/>
                </a-tooltip>
            </router-link>-->
            <a :href=" downBaseUrl + record.filePath">
                <a-tooltip placement="topLeft" title="下载">
                  <a-icon type="download"/>
                </a-tooltip>
            </a>
            <a :href="viewBaseUrl + record.filePath" target="_blank">
              <a-tooltip placement="topLeft" title=预览>
              <a-icon type="picture"/>
              </a-tooltip>
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
  import {deleteFile, queryForPage} from "@/network/files";
  import {ConditionParam, DateRangeCondition, LIKEANYWHERE, Order, PageQuery, SimpleCondition} from "@/util/pageQuery";
  import {pageSizeOptions, defaultPageSize, showTotal} from "@/util/pagination";
  import {viewBaseUrl, downBaseUrl} from "@/util/fsConstant";

  export default {
    name: "Files",
    components: {DateSearch},
    created() {
      const pageQuery = new PageQuery(this.params);
      pageQuery.addOrder(Order.desc("uploadDate"));
      this.loadingData(pageQuery);
    },
    data() {
      return {
        data: [],
        deleteCacheLoading: false,
        viewBaseUrl,
        downBaseUrl,
        loading: {spinning: false, tip: "加载中..."},
        pagination: {
          total: 0,
          defaultPageSize,
          showTotal,
          pageSizeOptions,
          showQuickJumper: true,
          showSizeChanger: true
        },
        params: new ConditionParam([new SimpleCondition("fileName", null, LIKEANYWHERE)],
          [new DateRangeCondition(null, "uploadDate")])
      }
    },
    computed: {
      columns() {
        return [{
          title: '文件名',
          align: 'center',
          dataIndex: 'fileName',
          width: '25%'
        }, {
          title: 'bucket名称',
          align: 'center',
          dataIndex: 'bucketName',
          width: '15%'
        }, {
          title: '扩展名',
          align: 'center',
          dataIndex: 'extension',
          width: "10%"
        }, {
          title: '文件大小',
          align: 'center',
          width: "10%",
          customRender(record) {
            return record.fileSize + record.unit;
          }
        }, {
          title: '上传时间',
          align: 'center',
          dataIndex: 'uploadDate',
          width: "20%",
          sorter: true
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
      handlerDelete(record) {
        deleteFile(record.id)
          .then(response => {
            this.loadingData(new PageQuery(this.params));
            this.$message.success(response.message);
          });
      },
      loadingData(query) {
        this.loading.spinning = true;
        queryForPage(query).then(response => {
          this.data = response.data.data;
          this.pagination.total = response.data.totalRow;
        }).finally(() => this.loading.spinning = false);
      },
      handlerSearch() {
        this.loadingData(new PageQuery(this.params));
      },
      dateChange(selected) {
        this.params.updateDateRangeValue("uploadDate", selected);
      },
      deleteCache() {
        this.deleteCacheLoading = true;
        const _this = this;
        setTimeout(() => {
          _this.deleteCacheLoading = false;
        }, 2000);
      },
      handleChange(pagination, filters, sorter) {
        let orders = sorter.order ? [new Order(sorter.columnKey, sorter.order === "descend")] : [];
        this.loadingData(new PageQuery(this.params, pagination.current, pagination.pageSize, orders));
      }
    }
  }
</script>

<style scoped>

</style>

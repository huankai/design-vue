<template>
  <div>
    <div class="search">
      <date-search :showTime="false" :showToday="true" :label="'上传时间'"
                   @dateChange="dateChange"/>
      <a-row>
        <a-col :span="8">
          <label>
            <span class="field">文件名: </span>
            <a-input v-model="params.fileName" placeholder="请输入文件名"></a-input>
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
            <router-link :to="{path:'/files/details',query:{id:record.id}}">
                <a-tooltip placement="topLeft" title="详情">
                  <a-icon type="eye"/>
                </a-tooltip>
            </router-link>
            <router-link :to="{path:'/files/down',query:{id:record.id}}">
              <a-tooltip placement="topLeft" title="下载">
                <a-icon type="download"/>
              </a-tooltip>
            </router-link>
            <router-link :to="{path:'/files/view',query:{id:record.id}}">
              <a-tooltip placement="topLeft" title=预览>
              <a-icon type="picture"/>
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
  import {queryForPage} from "@/network/files";
  import {Order, PageQuery} from "@/util/pageQuery";

  export default {
    name: "Files",
    components: {DateSearch},
    created() {
      let query = new PageQuery();
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
          dataIndex: 'ext',
          width: "10%"
        }, {
          title: '文件大小',
          align: 'center',
          dataIndex: 'fileSize',
          width: "10%"
        }, {
          title: '上传时间',
          align: 'center',
          dataIndex: 'uploadDate',
          width: "20%"
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
      handlerSearch() {
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

<style scoped>

</style>

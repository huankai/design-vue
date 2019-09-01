<template>
  <div>
    <div class="search">
      <a-row>
        <a-col :span="8">
          <label>
            <span class="field">自定义编号: </span>
            <a-input v-model="params.code" placeholder="请输入自定义编号"></a-input>
          </label>
        </a-col>
        <a-col :span="8">
          <label>
            <span class="field">名称: </span>
            <a-input v-model="params.fullName" placeholder="请输入名称"></a-input>
          </label>
        </a-col>
        <a-col :span="8">
          <div>
            <a-button type="primary" icon="search" @click="searchBtn">搜索</a-button>
            <a-button type="primary" icon="file-excel" @click="visible = true">导出</a-button>
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
        <router-link :to="{path:'/address/child',query:{id:record.id}}">
            <a-tooltip placement="topLeft" title="查看子级">
              <a-icon type="pic-center"/>
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
    <a-modal title="导出数据" :visible="visible" @ok="dataExport" @cancel="visible = false">
      <a-form>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="导出格式" :label-col="{span:8}">
              <a-radio-group name="exportFormat" :defaultValue="1">
                <a-radio :value="1">Excel</a-radio>
                <a-radio :value="2">JSON</a-radio>
              </a-radio-group>
            </a-form-item>
            <a-form-item label="过滤条件" :label-col="{span:8}">
              <a-switch/>
            </a-form-item>
          </a-col>

        </a-row>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
    import {queryForPage, deleteById} from "@/network/address";
    import {Order, PageQuery} from "@/util/pageQuery";

    export default {
        name: "Address",
        created() {
            const query = new PageQuery();
            query.param = this.params;
            this.loadingData(query);
        },
        data() {
            return {
                visible: false,
                data: [],
                searchLoading: false,
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
                    cityType: 1,//// 一级默认显示省
                    fullName: null

                }
            }
        },
        computed: {
            columns() {
                return [{
                    title: '自定义编号',
                    align: 'center',
                    dataIndex: 'code',
                    width: '15%',
                    sorter: true
                }, {
                    title: '编号(国标)',
                    align: 'center',
                    dataIndex: 'areaCode',
                    width: '15%',
                    sorter: true
                }, {
                    title: '名称',
                    align: 'center',
                    dataIndex: 'fullName',
                    width: '15%'
                }, {
                    title: '简称',
                    align: 'center',
                    dataIndex: 'shortName',
                    width: '15%'
                }, {
                    title: '级别',
                    align: 'center',
                    dataIndex: 'cityTypeText',
                    width: "10%"
                }, {
                    title: '邮编',
                    align: 'center',
                    dataIndex: 'postOffice',
                    width: "10%"
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
            dataExport() {
                this.$message.info("正在开发中...")
            },
            loadingData(queryPage) {
                this.loading.spinning = true;
                queryForPage(queryPage).then(response => {
                    this.data = response.data.data;
                    this.pagination.total = response.data.totalRow;
                }).catch(err => {
                    this.$message.error(err.response.data.message || "操作失败");
                }).finally(() => this.loading.spinning = false);
            },
            handlerDelete(record) {
                deleteById(record.id).then(response => {
                    this.$message.success(response.message || "操作成功");
                }).catch(err => {
                    this.$message.error(err.response.data.message || "操作失败")
                }).finally(() => {
                    this.loadingData(new PageQuery(this.params));
                });
            },
            searchBtn() {
                this.loadingData(new PageQuery(this.params));
            },
            handleChange(pagination, filters, sorter) {
                let orders = sorter.order ? [new Order(sorter.field, sorter.order === "descend")] : [];
                this.loadingData(new PageQuery(this.params, pagination.current, pagination.pageSize, orders));
            }
        }
    }
</script>

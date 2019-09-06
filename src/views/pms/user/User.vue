<template>
  <div>
    <div class="search">
      <a-row>
        <date-search :showTime="false" :showToday="true" :label="'注册时间'"
                     @dateChange="dateChange"/>
      </a-row>
      <a-row>
        <a-col :span="8">
          <label>
            <span class="field">所属机构: </span>
            <a-input v-model="params.account" placeholder="所属机构"></a-input>
          </label>
        </a-col>
        <a-col :span="8">

          <label>
            <span class="field">用户状态: </span>
            <a-select
              showSearch
              placeholder="用户状态"
              optionFilterProp="children"
              style="width: 50%"
              :allowClear="true"
              @change="value => this.params.userStatus = value">
              <a-select-option v-for="item in userStatusList" :value="item.value">{{ item.text}}</a-select-option>
            </a-select>
          </label>
        </a-col>
      </a-row>
      <a-divider dashed/>
      <a-row>
        <a-col :span="8">
          <label>
            <span class="field">用户账号: </span>
            <a-input v-model="params.account" placeholder="用户账号"></a-input>
          </label>
        </a-col>
        <a-col :span="8">
          <label>
            <span class="field">用户名称: </span>
            <a-input v-model="params.realName" placeholder="请输入用户名称"></a-input>
          </label>
        </a-col>
        <a-col :span="8">
          <div>
            <a-button type="primary" icon="search" @click="handlerSearch">搜索</a-button>
            <router-link to="/users/add">
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
      <span slot="userStatus" slot-scope="record">
        <a-tag :color="record.userStatusColor">{{ record.userStatusText }}</a-tag>
      </span>
      <span slot="action" slot-scope="text,record">
        <span>
          <router-link :to="{path:'/users/edit',query:{id:record.id}}">
              <a-tooltip placement="topLeft" title="编辑">
                <a-icon type="edit"/>
              </a-tooltip>
          </router-link>
          <a href="javascript:void (0);" @click="showUpdatePasswordModal">
              <a-tooltip placement="topLeft" title="修改密码">
                <a-icon type="security-scan"/>
              </a-tooltip>
          </a>
          <a href="javascript:void (0);">
            <a-popconfirm title="确定要禁用该用户吗？" v-if="record.userStatus === 1" placement="bottom"
                          @confirm="handleDisable(record)">
              <a-icon slot="icon" type="question-circle" style="color: red"/>
              <a-tooltip placement="topLeft" title="禁用">
                <a-icon type="lock" :style="{color: 'red'}"/>
              </a-tooltip>
            </a-popconfirm>
            <a-popconfirm title="确定要启用该用户吗？" v-else-if="record.userStatus === 0" placement="bottom"
                          @confirm="handleEnable(record)">
              <a-icon slot="icon" type="question-circle" style="color: red"/>
              <a-tooltip placement="topLeft" title="启用">
                <a-icon type="unlock"/>
              </a-tooltip>
            </a-popconfirm>
          </a>
          <a href="javascript:void (0);" v-if="record.userStatus !== 0">
            <a-popconfirm title="确定要删除吗？" placement="bottom" @confirm="handlerDelete(record)">
              <a-icon slot="icon" type="question-circle" style="color: red"/>
              <a-tooltip placement="topLeft" title="删除">
                <a-icon type="delete" :style="{color: 'red'}"/>
              </a-tooltip>
            </a-popconfirm>
          </a>
          <a href="javascript:void (0);" v-if="record.userStatus !== 0">
              <a-tooltip placement="topLeft" title="配置角色">
                  <a-icon type="audit"/>
              </a-tooltip>
          </a>
        </span>
          </span>
    </a-table>
    <a-modal title="修改密码" :visible="updatePasswordVisible" @ok="handlerUpdatePassword"
             @cancel="updatePasswordVisible = false" :destroyOnClose="true" :maskClosable="false">
      <a-form :form="form" :confirmLoading="true">
        <a-form-item label="新密码">
          <a-input
            v-decorator="['password',{rules: [{ required: true, message: '密码必填，不能为空格，且长度在 8 ~ 20之间',min:8,max:20,whitespace:true  }]}]"
            type="password"></a-input>
        </a-form-item>
        <a-form-item label="确认新密码">
          <a-input
            v-decorator="['confirm',{rules: [{ required: true, message: '两次输入密码不正确',validator:compareToFirstPassword}]}]"
            type="password"></a-input>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
  import DateSearch from "@/components/search/DateSearch";
  import {Order, PageQuery} from "@/util/pageQuery";
  import {disableUser, enableUser, getUserStatusList, queryForPage} from "@/network/user";

  export default {
    name: "User",
    components: {DateSearch},
    data() {
      return {
        data: [],
        userStatusList: [],
        loading: {spinning: false, tip: "加载中..."},
        params: {},
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
        updatePasswordVisible: false,
        form: null
      }
    },
    created() {
      getUserStatusList().then(response => this.userStatusList = response.data);
      let query = new PageQuery();
      query.addOrder(Order.desc("createdDate"));
      this.loadingData(query);
    },
    computed: {
      columns() {
        return [{
          title: '用户账号',
          align: 'center',
          dataIndex: 'account',
          width: '10%',
          sorter: true
        }, {
          title: '手机号',
          align: 'center',
          dataIndex: 'phone',
          width: "10%"
        }, {
          title: '用户名称',
          align: 'center',
          dataIndex: 'realName',
          width: "10%"
        }, {
          title: '用户状态',
          align: 'center',
          width: "10%",
          scopedSlots: {
            customRender: "userStatus"
          },
        }, {
          title: '注册时间',
          align: 'center',
          dataIndex: 'registerDate',
          key: "createdDate",
          width: "15%",
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
      dateChange(value) {
        this.$message.info(value.range);
      },
      loadingData(queryPage) {
        this.loading.spinning = true;
        queryForPage(queryPage).then(response => {
          this.data = response.data.data;
          this.pagination.total = response.data.totalRow;
        }).finally(() => this.loading.spinning = false);
      },
      showUpdatePasswordModal() {
        this.updatePasswordVisible = true;
        if (this.form == null) {
          this.form = this.$form.createForm(this);
        }
      },
      handlerUpdatePassword() {
        this.form.validateFields((errors) => {
          if (!errors) {
            this.$message.info(JSON.stringify(this.form.getFieldsValue()));
            this.updatePasswordVisible = false;
          }
        });
      },
      compareToFirstPassword(rule, value, callback) {
        const form = this.form;
        if (!value || value !== form.getFieldValue('password')) {
          callback(rule.message);
        } else {
          callback();
        }
      },
      handleDisable(record) {
        disableUser(record.id).then(response => {
          this.$message.success(response.message);
          this.loadingData(new PageQuery());
        })
      },
      handleEnable(record) {
        enableUser(record.id).then(response => {
          this.$message.success(response.message);
          this.loadingData(new PageQuery());
        })
      },
      handlerSearch() {
        this.loadingData(new PageQuery(this.params));
      },
      handlerDelete(record) {
        // deleteById(record.id).then(response => {
        //   this.$message.success(response.message);
        //   this.loadingData(new PageQuery());
        // });
      },
      handleChange(pagination, filters, sorter) {
        let orders = sorter.order ? [new Order(sorter.columnKey, sorter.order === "descend")] : [];
        this.loadingData(new PageQuery(this.params, pagination.current, pagination.pageSize, orders));
      },
    }
  }
</script>

<style scoped>

</style>

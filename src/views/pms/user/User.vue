<template>
  <div>
    <div class="search">
      <date-search :showTime="false" :showToday="true" :label="'注册时间'"
                   @dateChange="dateChange"/>
      <a-row>
        <a-col :span="6">
          <label>
            <span class="field">用户账号: </span>
            <a-input @change="e => this.params.updateSimpleValue('account',e.target.value)"
                     placeholder="用户账号"></a-input>
          </label>
        </a-col>
        <a-col :span="6">
          <label>
            <span class="field">用户名称: </span>
            <a-input @change="e => this.params.updateSimpleValue('realName',e.target.value)"
                     placeholder="请输入用户名称"></a-input>
          </label>
        </a-col>
        <a-col :span="6">
          <label>
            <span class="field">用户状态: </span>
            <a-select
              showSearch
              placeholder="用户状态"
              optionFilterProp="children"
              style="width: 50%"
              :allowClear="true"
              @change="value => this.params.updateSimpleValue('userStatus',value)">
              <a-select-option v-for="item in userStatusList" :value="item.value">{{ item.text}}</a-select-option>
            </a-select>
          </label>
        </a-col>
        <a-col :span="6">
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
    <div>
      <a-row :gutter="16">
        <a-col :span="4" style="border-right:1px dashed #e8e8e8;">
          <!--          <a-input-search style="margin-bottom: 8px" placeholder="请输入机构名称搜索"/>-->
          <!--          <a-tree-->
          <!--            :treeData="orgTreeData"-->
          <!--          ></a-tree>-->
          <organization-tree :show-search="false" @onSelect="org => this.params.updateSimpleValue('orgId',org.id)"
                             :status-check="false"></organization-tree>
        </a-col>
        <a-col :span="20">
          <a-table rowKey="id" :columns="columns" :loading="loading" :dataSource="data"
                   @change="handleChange"
                   :pagination="pagination">
            <template slot="userStatus" slot-scope="record">
              <a-tag :color="record.userStatusColor">{{ record.userStatusText }}</a-tag>
            </template>
            <template slot="action" slot-scope="text,record">
              <span>
                <router-link :to="{path:'/users/edit',query:{id:record.id}}">
                    <a-tooltip placement="topLeft" title="编辑">
                      <a-icon type="edit"/>
                    </a-tooltip>
                </router-link>
                <a href="javascript:void (0);" @click="showUpdatePasswordModal(record)" v-if="record.userStatus === 1">
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
                  <a-popconfirm title="确定要启用该用户吗？" v-else-if="record.userStatus !== 1" placement="bottom"
                                @confirm="handleEnable(record)">
                    <a-icon slot="icon" type="question-circle" style="color: red"/>
                    <a-tooltip placement="topLeft" title="启用">
                      <a-icon type="unlock"/>
                    </a-tooltip>
                  </a-popconfirm>
                </a>
                <a href="javascript:void (0);" v-if="record.userStatus !== 9">
                  <a-popconfirm title="确定要删除吗？" placement="bottom" @confirm="handlerDelete(record)">
                    <a-icon slot="icon" type="question-circle" style="color: red"/>
                    <a-tooltip placement="topLeft" title="删除">
                      <a-icon type="delete" :style="{color: 'red'}"/>
                    </a-tooltip>
                  </a-popconfirm>
                </a>
                <a href="javascript:void (0);" v-if="record.userStatus === 1" @click="showConfigRoleModal(record)">
                    <a-tooltip placement="topLeft" title="配置角色">
                        <a-icon type="audit"/>
                    </a-tooltip>
                </a>
              </span>
            </template>
          </a-table>
        </a-col>
      </a-row>
    </div>

    <a-modal title="修改密码" :visible="updatePasswordVisible" @ok="handlerUpdatePassword"
             @cancel="updatePasswordVisible = false" :destroyOnClose="true" :maskClosable="false">
      <a-form :form="form" :confirmLoading="true">
        <p>当前正在修改 {{updatePasswordUser.realName }} 的密码：</p>
        <a-form-item label="新密码" :label-col="{span: 6}" :wrapper-col="{span: 12}">
          <a-input
            v-decorator="['password',{rules: [{ required: true, message: '密码必填，不能为空格，且长度在 8 ~ 20之间',min:8,max:20,whitespace:true  }]}]"
            type="password" placeholder="请输入新密码"></a-input>
        </a-form-item>
        <a-form-item label="确认新密码" :label-col="{span: 6}" :wrapper-col="{span: 12}">
          <a-input
            v-decorator="['confirm',{rules: [{ required: true, message: '两次输入密码不正确',validator:compareToFirstPassword}]}]"
            type="password" placeholder="请再次输入新密码"></a-input>
        </a-form-item>
      </a-form>
    </a-modal>
    <a-modal title="配置角色" :visible="configUserRoleModalVisible" @ok="uploadUserRole"
             @cancel="configUserRoleModalVisible = false" :destroyOnClose="true" :maskClosable="false">
      <p>
        <a-tree :checkable="true" :treeData="roleTreeList" :checkedKeys="roleCheckedKeys"
                @check="roleOnCheck"
                :loadData="loadRoleData"></a-tree>
      </p>
    </a-modal>

  </div>
</template>

<script>
  import DateSearch from "@/components/search/DateSearch";
  import OrganizationTree from "@/views/pms/org/OrganizationTree";
  import {ConditionParam, DateRangeCondition, LIKEANYWHERE, Order, PageQuery, SimpleCondition} from "@/util/pageQuery";
  import {pageSizeOptions, defaultPageSize, showTotal} from "@/util/pagination";

  import {
    disableUser,
    enableUser,
    getUserStatusList,
    markDeleted,
    queryForPage,
    resetPasswordByAdmin
  } from "@/network/user";
  import {format} from "@/util/moments";
  import {findTree} from "@/network/clientApp";
  import {loadRoleData, uploadUserRole} from "@/network/role";

  export default {
    name: "User",
    components: {OrganizationTree, DateSearch},
    data() {
      return {
        data: [],
        userStatusList: [],
        loading: {spinning: false, tip: "加载中..."},
        params: new ConditionParam([new SimpleCondition("orgId", null),
            new SimpleCondition("userStatus", null),
            new SimpleCondition("account", null, LIKEANYWHERE),
            new SimpleCondition("realName", null, LIKEANYWHERE)],
          [new DateRangeCondition(null, "createdDate")]),
        orgTreeData: [],
        pagination: {
          total: 0,
          defaultPageSize,
          showTotal,
          pageSizeOptions,
          showQuickJumper: true,
          showSizeChanger: true
        },
        updatePasswordVisible: false,
        updatePasswordUser: {},
        form: null,
        configUserRoleModalVisible: false,
        roleTreeList: [],
        roleCheckedKeys: [],
        configRoleUser: null, //配置用户角色的用户
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
          title: '用户名称',
          align: 'center',
          dataIndex: 'realName',
          width: "10%"
        }, {
          title: '用户类型',
          align: 'center',
          width: "10%",
          dataIndex: 'userTypeText'
        }, {
          title: '用户状态',
          align: 'center',
          width: "10%",
          scopedSlots: {
            customRender: "userStatus"
          }
        }, {
          title: '注册时间',
          align: 'center',
          key: "createdDate",
          width: "15%",
          customRender(record) {
            return format(record.registerDate);
          },
          sorter: true
        }, {
          title: '操作',
          scopedSlots: {
            customRender: "action"
          },
          width: "15%"
        }
        ];

      }
    },
    methods: {
      loadRoleData(treeNode) {
        return new Promise(resolve => {
          loadRoleData(treeNode.value, this.configRoleUser.id,this.configRoleUser.orgId).then(response => {
            treeNode.dataRef.children = response.data.treeData;
            this.roleCheckedKeys = response.data.userRoleIds;
            this.roleTreeList = [...this.roleTreeList];
            resolve();
          })
        });
      },
      roleOnCheck(selectedKeys) {
        this.roleCheckedKeys = selectedKeys;
      },
      uploadUserRole() {
        uploadUserRole(this.configRoleUser.id, this.roleCheckedKeys).then(response => {
          this.configUserRoleModalVisible = false;
          this.$message.success(response.message);
        });
      },
      showConfigRoleModal(record) {
        this.configUserRoleModalVisible = true;
        this.configRoleUser = record;
        if (this.roleTreeList.length === 0) {
          findTree().then(response => {
            this.roleTreeList = response.data;
          })
        }
      },
      dateChange(value) {
        this.params.updateDateRangeValue("createdDate", value);
      },
      loadingData(queryPage) {
        this.loading.spinning = true;
        queryForPage(queryPage).then(response => {
          this.data = response.data.data;
          this.pagination.total = response.data.totalRow;
        }).finally(() => this.loading.spinning = false);
      },
      showUpdatePasswordModal(record) {
        this.updatePasswordVisible = true;
        if (this.form == null) {
          this.form = this.$form.createForm(this);
        }
        this.updatePasswordUser = {id: record.id, realName: record.realName};
      },
      handlerUpdatePassword() {
        this.form.validateFields((errors) => {
          if (!errors) {
            let data = this.form.getFieldsValue();
            resetPasswordByAdmin(this.updatePasswordUser.id, data.password, data.confirm).then(response => {
              this.$message.info(response.message);
              this.updatePasswordVisible = false;
            });
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
          this.loadingData(new PageQuery(this.params, this.pagination.current, this.pagination.pageSize));
        })
      },
      handleEnable(record) {
        enableUser(record.id).then(response => {
          this.$message.success(response.message);
          this.loadingData(new PageQuery(this.params, this.pagination.current, this.pagination.pageSize));
        })
      },
      handlerSearch() {
        this.loadingData(new PageQuery(this.params));
      },
      handlerDelete(record) {
        markDeleted(record.id).then(response => {
          this.$message.success(response.message);
          this.loadingData(new PageQuery(this.params, this.pagination.current, this.pagination.pageSize));
        })
      },
      handleChange(pagination, filters, sorter) {
        let orders = sorter.order ? [new Order(sorter.columnKey, sorter.order === "descend")] : [];
        this.pagination.current = pagination.current;
        this.pagination.pageSize = pagination.pageSize;
        this.loadingData(new PageQuery(this.params, pagination.current, pagination.pageSize, orders));
      },
    }
  }
</script>

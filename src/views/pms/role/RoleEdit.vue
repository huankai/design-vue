<template>
  <a-spin :spinning="loading" tip="保存中...">
    <a-form :form="form">
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol"
                       label="所属应用">
            <a-select placeholder="请选择应用" :disabled="role.id != null"
                      v-decorator="['appId',{initialValue:role.appId, rules: [{ required: true,message: '所属应用必选'}]}]">
              <a-select-option v-for="item in appList" :key="item.id" :disabled="item.disabled">{{ item.name}}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item :label-col="formItemLayout.labelCol" has-feedback :wrapper-col="formItemLayout.wrapperCol"
                       label="角色编号">
            <a-input
              v-decorator="['roleCode',{initialValue:role.roleCode, rules: [{ required: true,message: '角色编号必填，且不能超过 20 长度',max:20,whitespace:true }]}]"
              placeholder="请输入角色编号" autocomplete="off"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item :label-col="formItemLayout.labelCol" has-feedback :wrapper-col="formItemLayout.wrapperCol"
                       label="角色名称">
            <a-input
              v-decorator="['roleName',{initialValue:role.roleName, rules: [{ required: true,message: '角色名称必填，且不能超过 20 长度',max:20,whitespace:true }]}]"
              placeholder="请输入角色名称" autocomplete="off"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol" label="是否启用">
            <a-switch :checked="role.roleStatus" @change="role.roleStatus = !role.roleStatus"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item :label-col="formItemLayout.labelCol" has-feedback :wrapper-col="formItemLayout.wrapperCol"
                       label="描述">
            <a-textarea placeholder="请输入描述信息..."
                        v-decorator="['description',{initialValue:role.description, rules: [{max:200,message:'最长不能超过200字'}]}]"
                        :autosize="{minRows: 2,maxRows:5}"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item :label-col="{span:4}" :wrapper-col="{span: 8, offset: 4}">
            <a-button type="primary" @click="handleSubmit">
              <a-icon type="save"/>
              保存
            </a-button>
            <router-link to="/roles">
              <a-button type="default">
                <a-icon type="undo"/>
                返回
              </a-button>
            </router-link>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-spin>
</template>

<script>

  import {getSelectOption} from "@/network/clientApp";
  import {findById, saveOrUpdate} from "@/network/role";

  const formItemLayout = {
    labelCol: {span: 3},
    wrapperCol: {span: 9}
  };
  export default {
    name: "RoleEdit",
    data() {
      return {
        loading: false,
        formItemLayout,
        appList: [],
        role: {
          roleStatus: true
        }
      }
    },
    beforeCreate() {
      this.form = this.$form.createForm(this);
    },
    created() {
      getSelectOption().then(response => this.appList = response.data);
      let id = this.$route.query.id;
      if (id) {
        findById(id).then(response => {
          this.role = response.data;
        })
      }
    },
    methods: {
      handleSubmit() {
        this.form.validateFields((errors) => {
          if (!errors) {
            this.loading = true;
            let data = Object.assign(this.role, this.form.getFieldsValue());
            saveOrUpdate(data).then(response => {
              this.$message.success(response.message);
              this.$router.replace("/roles");
            }).finally(() => this.loading = false);
          }
        });
      }
    }
  }
</script>

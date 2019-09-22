<template>
  <a-spin :spinning="loading" tip="保存中...">
    <a-form :form="form">
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol"
                       label="所属应用">
            <a-select placeholder="请选择应用" :disabled="permission.id != null"
                      v-decorator="['appId',{initialValue:permission.appId, rules: [{ required: true,message: '所属应用必选'}]}]">
              <a-select-option v-for="item in appList" :key="item.id" :disabled="item.disabled">{{ item.name}}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item :label-col="formItemLayout.labelCol" has-feedback :wrapper-col="formItemLayout.wrapperCol"
                       label="权限编号">
            <a-input
              v-decorator="['permissionCode',{initialValue:permission.permissionCode, rules: [{ required: true,message: '权限编号必填，且不能超过 20 长度',max:20,whitespace:true }]}]"
              placeholder="请输入权限编号" autocomplete="off"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item :label-col="formItemLayout.labelCol" has-feedback :wrapper-col="formItemLayout.wrapperCol"
                       label="权限名称">
            <a-input
              v-decorator="['permissionName',{initialValue:permission.permissionName, rules: [{ required: true,message: '权限名称必填，且不能超过 20 长度',max:20,whitespace:true }]}]"
              placeholder="请输入权限名称" autocomplete="off"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item :label-col="formItemLayout.labelCol" has-feedback :wrapper-col="formItemLayout.wrapperCol"
                       label="描述">
            <a-textarea placeholder="请输入描述信息..."
                        v-decorator="['description',{initialValue:permission.description, rules: [{max:200,message:'最长不能超过200字'}]}]"
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
            <router-link to="/permission">
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
  import {findById, saveOrUpdate} from "@/network/permission";

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
        permission: {}
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
          this.permission = response.data;
        })
      }
    },
    methods: {
      handleSubmit() {
        this.form.validateFields((errors) => {
          if (!errors) {
            this.loading = true;
            let data = Object.assign(this.permission, this.form.getFieldsValue());
            saveOrUpdate(data).then(response => {
              this.$message.success(response.message);
              this.$router.replace("/permission");
            }).finally(() => this.loading = false);
          }
        });
      }
    }
  }
</script>

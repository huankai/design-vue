<template>
  <a-spin :spinning="loading" tip="保存中...">
    <a-form :form="form">
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item :label-col="formItemLayout.labelCol" has-feedback :wrapper-col="formItemLayout.wrapperCol"
                       label="机构编号">
            <a-input
              v-decorator="['orgCode',{initialValue:org.orgCode, rules: [{ required: true, message: '机构编号必填，不能为空格，且不能超过20长度',max:20,whitespace:true  }]}]"
              placeholder="请输入机构编号"
              autocomplete="off"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item :label-col="{span: 8}" has-feedback :wrapper-col="{span:16}"
                       label="机构名称">
            <a-input
              v-decorator="['orgName',{initialValue:org.orgName, rules: [{ required: true, message: '机构名称必填，不能为空格，且不能超过20长度',max:20,whitespace:true }]}]"
              placeholder="请输入机构名称" autocomplete="off"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item :label-col="formItemLayout.labelCol" has-feedback :wrapper-col="formItemLayout.wrapperCol"
                       label="是否禁用">
            <a-switch :checked="org.state" @change="org.state = !org.state"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item :label-col="{span: 8}" has-feedback :wrapper-col="{span:16}"
                       label="机构标签">
            <a-input
              v-decorator="['orgTag',{initialValue:org.orgTag, rules: [{ message: '机构标签不能超过20长度',max:20,whitespace:true }]}]"
              placeholder="请输入机构标签" autocomplete="off"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item :label-col="{span:3}" :wrapper-col="{span: 9}" label="机构地址">
            <address-cascader :max-depth="3" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item :label-col="{span:3}" :wrapper-col="{span: 9}" label="描述">
            <a-textarea placeholder="请输入描述信息..."
                        v-decorator="['description',{rules: [{max:200,message:'最长不能超过200字'}]}]"
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
            <router-link to="/org">
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
  import AddressCascader from "@/components/cascader/AddressCascader";

  const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 18}
  };
  const formTailLayout = {
    labelCol: {span: 4},
    wrapperCol: {span: 8, offset: 4}
  };
  const addressOptions = [];
  export default {
    name: "OrganizationEdit",
    components: {AddressCascader},
    data() {
      return {
        loading: false,
        formItemLayout,
        formTailLayout,
        addressOptions,
        org: {
          state: false
        }
      };
    },
    beforeCreate() {
      this.form = this.$form.createForm(this)
    },
    methods: {
      handleSubmit() {
        this.form.validateFields((errors, values) => {
          if (!errors) {
            // this.loading = true;
            // let data = Object.assign(this.clientApp, this.form.getFieldsValue());
            // data.redirectUri = data.redirectUri.split(",");
            // saveOrUpdate(data).then(response => {
            //   this.$message.success(response.message || "保存成功");
            //   this.$router.replace("/app");
            // }).finally(() => this.loading = false);
          }
        });
      }
    }
  }
</script>

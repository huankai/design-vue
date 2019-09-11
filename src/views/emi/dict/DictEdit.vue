<template>
  <a-spin :spinning="loading" tip="保存中...">
    <a-form :form="form">
      <a-row>
        <a-col>
          <a-form-item :label-col="formItemLayout.labelCol" has-feedback :wrapper-col="formItemLayout.wrapperCol"
                       label="编号">
            <a-input
              v-decorator="['baseCode',{initialValue:dict.baseCode, rules: [{required: true, message: '编号必填,不能为空格，且不能超过20长度',max: 20,whitespace:true}]}]"
              placeholder="编号"
              autocomplete="off"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col>
          <a-form-item :label-col="formItemLayout.labelCol" has-feedback :wrapper-col="formItemLayout.wrapperCol"
                       label="名称">
            <a-input
              v-decorator="['codeName',{initialValue:dict.codeName, rules: [{required: true, message: '名称必填,不能为空格，且不能超过20长度',max: 20,whitespace:true}]}]"
              placeholder="名称"
              autocomplete="off"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col>
          <a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol" label="是否国标">
            <a-switch v-decorator="['isGb']" :checked="dict.isGb" @change="dict.isGb = !dict.isGb"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col>
          <a-form-item :label-col="formItemLayout.labelCol" has-feedback :wrapper-col="formItemLayout.wrapperCol"
                       label="描述">
            <a-textarea placeholder="请输入描述信息... "
                        v-decorator="['description',{initialValue:dict.description,rules: [{max:200,message:'最长不能超过200字'}]}]"
                        :autosize="{minRows: 2,maxRows:5}"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col>
          <a-form-item :label-col="formTailLayout.labelCol" :wrapper-col="formTailLayout.wrapperCol">
            <a-button type="primary" @click="handleSubmit">
              <a-icon type="save"/>
              保存
            </a-button>
            <router-link to="/dict">
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
  import {findById, saveOrUpdate} from "@/network/dict";

  const formItemLayout = {
    labelCol: {span: 3},
    wrapperCol: {span: 9}
  };
  const formTailLayout = {
    labelCol: {span: 4},
    wrapperCol: {span: 8, offset: 4}
  };
  export default {
    name: "DictEdit",
    data() {
      return {
        loading: false,
        formItemLayout,
        formTailLayout,
        dict: {}

      };
    },
    beforeCreate() {
      this.form = this.$form.createForm(this);
    },
    created() {
      let id = this.$route.query.id;
      if (id) {
        findById(id).then(response => {
          this.dict = response.data;
        })
      }
    },
    methods: {
      handleSubmit() {
        this.form.validateFields((errors, values) => {
          if (!errors) {
            this.loading = true;
            saveOrUpdate(Object.assign(this.dict, this.form.getFieldsValue()))
              .then(response => {
                this.$message.success(response.message);
                this.$router.replace("/dict");
              }).finally(() => this.loading = false);
          }
        });
      }
    }
  }
</script>

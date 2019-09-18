<template>
  <a-spin :spinning="loading" tip="保存中...">
    <a-form :form="form">
      <a-row>
        <a-col>
          <a-form-item :label-col="formItemLayout.labelCol" has-feedback :wrapper-col="formItemLayout.wrapperCol"
                       label="所属上级">
            {{childDict.baseCodeName}}
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col>
          <a-form-item :label-col="formItemLayout.labelCol" has-feedback :wrapper-col="formItemLayout.wrapperCol"
                       label="编号">
            <a-input
              v-decorator="['childCode',{initialValue:childDict.childCode, rules: [{required: true, message: '编号必填,不能为空格，且不能超过20长度',max: 20,whitespace:true}]}]"
              placeholder="请输入编号"
              autocomplete="off"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col>
          <a-form-item :label-col="formItemLayout.labelCol" has-feedback :wrapper-col="formItemLayout.wrapperCol"
                       label="名称">
            <a-input
              v-decorator="['codeName',{initialValue:childDict.codeName, rules: [{required: true, message: '名称必填,不能为空格，且不能超过20长度',max: 20,whitespace:true}]}]"
              placeholder="请输入名称"
              autocomplete="off"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col>
          <a-form-item :label-col="formItemLayout.labelCol" has-feedback :wrapper-col="formItemLayout.wrapperCol"
                       label="值">
            <a-input
              v-decorator="['codeValue',{initialValue:childDict.codeValue, rules: [{required: true,validator:this.$validator.isNumber,max: 50,whitespace:true}]}]"
              placeholder="请输入值"
              autocomplete="off"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col>
          <a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol"
                       label="是否有效">
            <a-switch :checked="childDict.state" @change="childDict.state = !childDict.state"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col>
          <a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol" label="是否国标">
            <a-switch :checked="childDict.isGb" @change="childDict.isGb = !childDict.isGb"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col>
          <a-form-item :label-col="formItemLayout.labelCol" has-feedback :wrapper-col="formItemLayout.wrapperCol"
                       label="描述">
            <a-textarea placeholder="请输入描述信息... "
                        v-decorator="['description',{initialValue:childDict.description,rules: [{max:200,message:'最长不能超过200字'}]}]"
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
            <router-link :to="{path:'/dict/child',query:{id:childDict.baseCodeId}}">
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
  import {findById, findChildById, saveOrUpdateChild} from "@/network/dict";

  const formItemLayout = {
    labelCol: {span: 3},
    wrapperCol: {span: 9}
  };
  const formTailLayout = {
    labelCol: {span: 4},
    wrapperCol: {span: 8, offset: 4}
  };
  export default {
    name: "DictChildEdit",
    data() {
      return {
        loading: false,
        formItemLayout,
        formTailLayout,
        childDict: {
          isGb: false,
          state: false
        }

      };
    },
    beforeCreate() {
      this.form = this.$form.createForm(this);
    },
    created() {
      let id = this.$route.query.id;
      if (id) {
        findChildById(id).then(response => {
          this.childDict = response.data;
        });
      } else {
        let baseCodeId = this.$route.query.baseCodeId;
        if (baseCodeId) {
          this.childDict.baseCodeId = baseCodeId;
          findById(baseCodeId).then(response => {
            this.childDict.baseCodeName = response.data.codeName;
          });
        }
      }
    },
    methods: {
      handleSubmit() {
        this.form.validateFields((errors, values) => {
          if (!errors) {
            this.loading = true;
            saveOrUpdateChild(Object.assign(this.childDict, this.form.getFieldsValue()))
              .then(response => {
                this.$message.success(response.message);
                this.$router.replace({name: "dictChild", query: {"id": this.childDict.baseCodeId}});
              }).finally(() => this.loading = false);
          }
        });
      }
    }
  }
</script>

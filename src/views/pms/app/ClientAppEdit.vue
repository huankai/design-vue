<template>
  <a-form :form="form">
    <a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol" label="应用编号">
      <a-input v-decorator="['appCode',{rules: [{ required: true, message: '应用编号不能为空' }]}]" placeholder="请输入应用编号"
               autocomplete="off"/>
    </a-form-item>
    <a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol" label="应用名称">
      <a-input v-decorator="['nickname',{rules: [{ required: true, message: '请输入应用名称' }]}]"
               placeholder="请输入应用名称" autocomplete="off"/>
    </a-form-item>
    <a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol" label="secret">
      <a-input type="password" v-decorator="['clientSecret',{rules: [{ required: true, message: '请输入应用secret' }]}]"
               placeholder="请输入应用secret" autocomplete="off"/>
    </a-form-item>
    <a-form-item :label-col="formItemLayout.labelCol" has-feedback :wrapper-col="formItemLayout.wrapperCol" label="有效期">
      <a-date-picker v-decorator="['expireDate',{rules: [{ required: false, message: '请输入有效期' }]}]"
                     placeholder="默认不过期"/>
    </a-form-item>
    <a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol" label="认证模式">
      <!--
        注意: 这里在使用验证时，要使用 this.form.setFieldsValue 来设置默认的选中值，使用 Vue 中生命周期中的 mounted 函数来实现
      -->
      <a-checkbox-group :options="authorizedGrantTypes" @change="handlerAuthorizedGrantTypesChange"
                        v-decorator="['authorizedGrantTypes',{rules: [{ required: true, message: '认证模式至少选择一种',type:'array'}]}]"/>
    </a-form-item>
    <a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol" label="Token过期时间">
      <a-input-number
        v-decorator="['accessTokenValidity', {initialValue: 2,rules:[{ required: true, message: 'Token过期时间必填'}] }]"
        :min="0.5"
        :max="5"/>
      <span class="ant-form-text">小时</span>
    </a-form-item>
    <a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol" label="RefreshToken过期时间"
                 v-if="checkedAuthorizedGrantTypes.includes('refresh_token')">
      <a-input-number
        v-decorator="['refreshTokenValidity', {initialValue: 1 ,rules:[{required:enableRefreshToken,message:'RefreshToken过期时间必填'}]}]"
        :min="1"
        :max="10"/>
      <span class="ant-form-text">天</span>
    </a-form-item>
    <a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol" label="回调地址">
      <a-input placeholder="请输入回调地址,不需要以http或https 开头"
               v-decorator="['redirectUri',{rules: [{ required: true, message: '回调地址必填' }]}]" autocomplete="off"/>
    </a-form-item>
    <a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol" label="是否自动认证">
      <a-switch defaultChecked/>
      <span class="ant-form-text">&nbsp;&nbsp;自动认证不会显示用户确认授权页</span>
    </a-form-item>
    <a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol" label="状态">
      <a-radio-group name="radioGroup" :defaultValue="1">
        <a-radio :value="1">有效</a-radio>
        <a-radio :value="2">无效</a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol" label="应用头像">
      <a-upload v-decorator="['upload', {valuePropName: 'fileList',getValueFromEvent: normFile}]" name="logo"
                action="/upload" list-type="picture">
        <a-button>
          <a-icon type="upload"/>
          点击上传
        </a-button>
      </a-upload>
    </a-form-item>
    <a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol" label="描述">
      <a-textarea placeholder="请输入描述信息... " :autosize="{minRows: 2,maxRows:5}"/>
    </a-form-item>
    <a-form-item :label-col="formTailLayout.labelCol" :wrapper-col="formTailLayout.wrapperCol">
      <a-button type="primary" @click="handleSubmit">
        <a-icon type="save"/>
        保存
      </a-button>
      <router-link to="/app">
        <a-button type="default">
          <a-icon type="undo"/>
          返回
        </a-button>
      </router-link>
    </a-form-item>
  </a-form>
</template>

<script>
    const formItemLayout = {
        labelCol: {span: 4},
        wrapperCol: {span: 8}
    };
    const formTailLayout = {
        labelCol: {span: 4},
        wrapperCol: {span: 8, offset: 4}
    };
    const authorizedGrantTypes = [{
        label: "授权码",
        value: "authorization_code"
    }, {
        label: "刷新Token",
        value: "refresh_token"
    }, {
        label: "密码模式",
        value: "password"
    }];
    export default {
        data() {
            return {
                enableRefreshToken: true,
                authorizedGrantTypes,
                checkedAuthorizedGrantTypes: ["authorization_code", "refresh_token"],
                formItemLayout,
                formTailLayout,
            };
        },
        beforeCreate() {
            this.form = this.$form.createForm(this)
        },
        mounted() {
            this.form.setFieldsValue({
                "authorizedGrantTypes": this.checkedAuthorizedGrantTypes
            });
        },
        methods: {
            normFile(e) {
                console.log('Upload event:', e);
                if (Array.isArray(e)) {
                    return e;
                }
                return e && e.fileList;
            },
            handlerAuthorizedGrantTypesChange(checkedValues) {
                this.checkedAuthorizedGrantTypes = checkedValues;
                this.enableRefreshToken = this.checkedAuthorizedGrantTypes.includes("refresh_token");
            },
            handleSubmit() {
                this.form.validateFields((errors, values) => {
                    if (!errors) {
                        this.$router.replace("/app");
                    }
                });
            }
        },
    };
</script>

<style scoped>

</style>

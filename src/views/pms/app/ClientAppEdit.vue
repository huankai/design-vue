<template>
  <a-spin :spinning="loading" tip="保存中...">
    <a-form :form="form">
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item :label-col="formItemLayout.labelCol" has-feedback :wrapper-col="formItemLayout.wrapperCol"
                       label="应用编号">
            <a-input
              v-decorator="['appCode',{initialValue:clientApp.appCode, rules: [{ required: true, message: '应用编号必填，不能为空格，且不能超过20长度',max:20,whitespace:true  }]}]"
              placeholder="请输入应用编号"
              autocomplete="off"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item :label-col="{span: 8}" has-feedback :wrapper-col="{span:16}"
                       label="应用名称">
            <a-input
              v-decorator="['appName',{initialValue:clientApp.appName, rules: [{ required: true, message: '应用名称必填，不能为空格，且不能超过20长度',max:20,whitespace:true }]}]"
              placeholder="请输入应用名称" autocomplete="off"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol" has-feedback label="有效日期">
            <a-date-picker
              v-decorator="['expireDate',{initialValue:clientApp.expireDate, rules: [{ required: false, message: '请输入有效期' }]}]"
              placeholder="默认不过期"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item  v-if="clientApp.id != null" :label-col="{span: 8}"
                       label="secret">
            <a-button type="primary" @click="showSecret">
              <a-icon type="eye"/>
              查看
            </a-button>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item :label-col="{span: 3}" has-feedback :wrapper-col="{span: 9}"
                       label="回调地址">
            <a-textarea placeholder="多个使用 , 分隔"
                        v-decorator="['redirectUri',{rules: [{ required: true, max:300,message: '回调地址必填，且不能超过300长度' }]}]"
                        autocomplete="off" :autosize="{minRows: 2,maxRows:5}"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24">
          <a-form-item :label-col="{span:3}" label="认证模式">
            <!--
              注意: 这里在使用验证时，要使用 this.form.setFieldsValue 来设置默认的选中值，使用 Vue 中生命周期中的 mounted 函数来实现
            -->
            <a-checkbox-group :options="authorizedGrantTypes" @change="handlerAuthorizedGrantTypesChange"
                              v-decorator="['authorizedGrantTypes',{initialValue:clientApp.authorizedGrantTypes, rules: [{ required: true, message: '认证模式至少选择一种',type:'array'}]}]"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol" label="Token过期时间">
            <a-input-number
              v-decorator="['accessTokenValidity', {initialValue: clientApp.accessTokenValidity,rules:[{ required: true, message: 'Token过期时间必填'}] }]"
              :min="3600" :step="60" :max="10800" @change="(value) => this.clientApp.accessTokenValidity = value"/>
            <span class="ant-form-text">秒 （{{ accessTokenValidityTime }} 小时）</span>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item :label-col="{span:8}" :wrapper-col="{span:16}"
                       label="RefreshToken过期时间"
                       v-if="enableRefreshToken">
            <a-input-number
              v-decorator="['refreshTokenValidity', {initialValue: clientApp.refreshTokenValidity,rules:[{required:enableRefreshToken,message:'RefreshToken过期时间必填'}]}]"
              :min="72000" :step="3600" :max="604800" @change="(value) => this.clientApp.refreshTokenValidity = value"/>
            <span class="ant-form-text">秒（{{ refreshTokenValidityTime }} 小时）</span>
          </a-form-item>
        </a-col>
      </a-row>

      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item :label-col="{span:6}" label="是否自动认证">
            <a-switch :checked="clientApp.autoapprove" @change="clientApp.autoapprove = !clientApp.autoapprove"/>
            <span class="ant-form-text">&nbsp;&nbsp;自动认证不会显示用户确认授权页</span>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item :label-col="{span: 8}" label="是否有效">
            <a-switch :checked="clientApp.appStatus" @change="clientApp.appStatus = !clientApp.appStatus"/>
            <span class="ant-form-text">&nbsp;&nbsp;无效状态则无法授权</span>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item :label-col="{span:3}" label="应用头像">
            <a-upload v-decorator="['upload', {valuePropName: 'fileList'}]" name="logo"
                      action="/upload" list-type="picture">
              <a-button>
                <a-icon type="upload"/>
                点击上传
              </a-button>
            </a-upload>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item :label-col="{span:3}" :wrapper-col="{span: 9}" label="描述">
            <a-textarea placeholder="请输入描述信息..."
                        v-decorator="['description',{initialValue:clientApp.description,rules: [{max:200,message:'最长不能超过200字'}]}]"
                        :autosize="{minRows: 2,maxRows:5}"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="24">
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
        </a-col>
      </a-row>
    </a-form>

    <a-modal v-if="clientApp.id != null" title="查看Secret" :visible="secretVisible" @ok="secretVisible = false"
             @cancel="secretVisible = false">
      <p>当前应用Id 为: <span>{{ clientApp.id }}</span></p>
      <p>Secret 为: <span>{{ clientApp.originalSecret }}</span></p>
      <p>将做为授权凭证，请妥善保管</p>
    </a-modal>
  </a-spin>
</template>

<script>
  import {findById, saveOrUpdate} from "@/network/clientApp";

  const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 18}
  };
  const formTailLayout = {
    labelCol: {span: 4},
    wrapperCol: {span: 8, offset: 4}
  };
  const authorizedGrantTypes = [{
    label: "授权码",
    disabled: true,
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
        loading: false,
        secretVisible: false,
        authorizedGrantTypes,
        formItemLayout,
        formTailLayout,
        clientApp: {
          accessTokenValidity: 7200,
          refreshTokenValidity: 86400,
          autoapprove: true,
          appStatus: true,
          authorizedGrantTypes: ["authorization_code", "refresh_token"]
        }
      };
    },
    beforeCreate() {
      this.form = this.$form.createForm(this)
    },
    created() {
      const id = this.$route.query.id;
      if (id) {
        findById(id).then(response => {
          this.clientApp = response.data;
          this.form.setFieldsValue({
            redirectUri: this.clientApp.redirectUri.toString()
          });
        })
      }
    },
    computed: {
      enableRefreshToken() {
        return this.clientApp.authorizedGrantTypes.includes("refresh_token")
      },
      accessTokenValidityTime() {
        return (this.clientApp.accessTokenValidity / 3600).toFixed(2);
      },
      refreshTokenValidityTime() {
        return (this.clientApp.refreshTokenValidity / 3600)
      }
    },
    methods: {
      generateSecret() {
        this.$message.info("正在开发中...")
      },
      showSecret() {
        if (this.clientApp.id) {
          this.secretVisible = true;
        } else {
          this.$message.info("当前未生成 Secret,请先生成Secret");
        }
      },
      handlerAuthorizedGrantTypesChange(checkedValues) {
        this.clientApp.authorizedGrantTypes = checkedValues;
      },
      handleSubmit() {
        this.form.validateFields((errors, values) => {
          if (!errors) {
            this.loading = true;
            let data = Object.assign(this.clientApp, this.form.getFieldsValue());
            data.redirectUri = data.redirectUri.split(",");
            saveOrUpdate(data).then(response => {
              this.$message.success(response.message);
              this.$router.replace("/app");
            }).finally(() => this.loading = false);
          }
        });
      }
    }
  };
</script>

<style scoped>

</style>

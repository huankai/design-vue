<template>
  <a-list
    itemLayout="horizontal"
    :dataSource="data"
  >
    <a-list-item slot="renderItem" slot-scope="item, index" :key="index">
      <a-list-item-meta>
        <a slot="title">{{ item.title }}</a>
        <span slot="description">
          <span class="security-list-description">{{ item.description }}</span>
          <span v-if="item.value"> : </span>
          <span class="security-list-value">{{ item.value }}</span>
        </span>
      </a-list-item-meta>
      <template v-if="item.actions">
        <a slot="actions" @click="item.actions.callback">{{ item.actions.title }}</a>
      </template>
    </a-list-item>
    <a-modal title="修改密码" :destroyOnClose="true" :maskClosable="false" :visible="updatePasswordVisible" @cancel="updatePasswordVisible = false"
             @ok="handlerUpdatePassword">
      <a-form :form="form" :confirmLoading="true">
        <a-form-item label="原密码" :label-col="{ span: 6 }" :wrapper-col="{ span: 12 }">
          <a-input
            v-decorator="['oldPassword',{rules: [{ required: true, message: '密码必填，不能为空格，且长度在 8 ~ 20之间',min:8,max:20,whitespace:true  }]}]"
            type="password"></a-input>
        </a-form-item>
        <a-form-item label="新密码" :label-col="{ span: 6 }" :wrapper-col="{ span: 12 }">
          <a-input
            v-decorator="['password',{rules: [{ required: true, message: '密码必填，不能为空格，且长度在 8 ~ 20之间',min:8,max:20,whitespace:true  }]}]"
            type="password"></a-input>
        </a-form-item>
        <a-form-item label="确认新密码" :label-col="{ span: 6 }" :wrapper-col="{ span: 12 }">
          <a-input
            v-decorator="['confirm',{rules: [{ required: true, message: '两次输入密码不正确'}]}]"
            type="password"></a-input>
        </a-form-item>
      </a-form>
    </a-modal>
    <a-modal title="修改手机" :destroyOnClose="true" :maskClosable="false" :visible="updatePhoneVisible" @cancel="updatePhoneVisible = false"
             @ok="handlerUpdatePhone">
      <a-form :form="form" :confirmLoading="true">
        <a-form-item label="新手机号" :label-col="{ span: 6 }" :wrapper-col="{ span: 12 }">
          <a-input
            v-decorator="['phone',{rules: [{ required: true, message: '密码必填，不能为空格，且长度在 8 ~ 20之间',min:8,max:20,whitespace:true  }]}]"
          ></a-input>
        </a-form-item>
        <a-form-item label="验证码" :label-col="{ span: 6 }" :wrapper-col="{ span: 12 }">
          <a-input
            v-decorator="['code',{rules: [{ required: true, message: '验证码不能为空'}]}]"></a-input>
        </a-form-item>
      </a-form>
    </a-modal>
    <a-modal title="修改邮箱" :destroyOnClose="true" :maskClosable="false" :visible="updateEmailVisible" @cancel="updateEmailVisible = false"
             @ok="handlerUpdateEmail">
      <a-form :form="form" :confirmLoading="true">
        <a-form-item label="新邮箱号" :label-col="{ span: 6 }" :wrapper-col="{ span: 12 }">
          <a-input
            v-decorator="['email',{rules: [{ required: true, message: '密码必填，不能为空格，且长度在 8 ~ 20之间',min:8,max:20,whitespace:true  }]}]"
          ></a-input>
        </a-form-item>
        <a-form-item label="验证码" :label-col="{ span: 6 }" :wrapper-col="{ span: 12 }">
          <a-input
            v-decorator="['code',{rules: [{ required: true, message: '验证码不能为空'}]}]"></a-input>
        </a-form-item>
      </a-form>
    </a-modal>
  </a-list>
</template>

<script>
  export default {
    name: "Security",
    data() {
      return {
        updatePasswordVisible: false,
        updatePhoneVisible: false,
        updateEmailVisible: false,
        form: null,
        data: [
          {
            title: '账户密码',
            description: '当前密码强度',
            value: '强',
            actions: {
              title: '修改',
              callback: () => {
                this.updatePasswordVisible = true;
              }
            }
          },
          {
            title: '密保手机', description: '已绑定手机', value: '188****6090', actions: {
              title: '修改', callback: () => {
                this.updatePhoneVisible = true;
              }
            }
          },
          {
            title: '密保邮箱', description: '已绑定邮箱', value: 'hu***@139.com', actions: {
              title: '修改', callback: () => {
                this.updateEmailVisible = true;
              }
            }
          },
        ]
      }
    },
    methods: {
      handlerUpdatePassword() {
        this.updatePasswordVisible = false;
        this.$message.error("正在开发中...");
      },
      handlerUpdatePhone() {
        this.updatePhoneVisible = false;
        this.$message.warn("正在开发中...");
      },
      handlerUpdateEmail() {
        this.updateEmailVisible = false;
        this.$message.info("正在开发中...");
      }
    }
  }
</script>

<style scoped>

</style>

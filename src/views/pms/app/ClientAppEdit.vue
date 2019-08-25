<template>
  <a-form>
    <a-form-item
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      label="应用编号"
      required>
      <a-input
        id="1"
        placeholder="请输入应用编号"
      />
    </a-form-item>
    <a-form-item
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      label="应用名称"
      required>
      <a-input
        id="2"
        placeholder="请输入应用编号"
      />
    </a-form-item>
    <a-form-item
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      label="clientSecret"
      required>
      <a-input
        id="3"
        placeholder="请输入clientSecret"
      />
    </a-form-item>
    <a-form-item
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      label="scope"
      required>
      <a-input
        id="4"
        placeholder="请输入scope"
      />
    </a-form-item>
    <!--    <a-form-item-->
    <!--      v-bind="formItemLayout"-->
    <!--      label="认证方式"-->
    <!--    >-->
    <!--      <a-checkbox-group-->
    <!--        v-decorator="['checkbox-group', {initialValue: ['A', 'B']}]"-->
    <!--        style="width: 100%;"-->
    <!--      >-->
    <!--        <a-row>-->
    <!--          <a-col :span="6">-->
    <!--            <a-checkbox value="1">授权码模式</a-checkbox>-->
    <!--          </a-col>-->
    <!--          <a-col :span="6">-->
    <!--            <a-checkbox value="B">密码模式</a-checkbox>-->
    <!--          </a-col>-->
    <!--          <a-col :span="6">-->
    <!--            <a-checkbox value="C">刷新Token</a-checkbox>-->
    <!--          </a-col>-->
    <!--        </a-row>-->
    <!--      </a-checkbox-group>-->

    <!--    </a-form-item>-->

    <a-form-item :wrapper-col="{ span: 12, offset: 6 }">
      <a-button type="primary" html-type="submit"><a-icon type="save" />保存</a-button>
      <router-link to="/app">
        <a-button type="default"><a-icon type="undo" />返回</a-button>
      </router-link>
    </a-form-item>
  </a-form>
</template>

<script>
    export default {
        name: "ClientAppEdit",
        data() {
            return {
                labelCol: {
                    xs: {span: 24},
                    sm: {span: 5},
                },
                formItemLayout: {
                    labelCol: {span: 6},
                    wrapperCol: {span: 14}
                },
                wrapperCol: {
                    xs: {span: 24},
                    sm: {span: 12},
                },
            };
        },
    }
</script>

<style scoped>

</style>

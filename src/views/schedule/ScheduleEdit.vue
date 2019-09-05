<template>
  <a-spin :spinning="loading" tip="保存中...">
    <a-form :form="form">
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol"
                       label="任务名称">
            <a-input
              v-decorator="['jobName',{initialValue:schedule.jobName, rules: [{ required: true, message: '任务名称必填，且不能超过20长度' ,max:20}]}]"
              placeholder="请输入任务名称"
              autocomplete="off"/>
          </a-form-item>
        </a-col>

      </a-row>
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol"
                       label="任务组名">
            <a-input
              v-decorator="['jobGroup',{initialValue:schedule.jobGroup,rules: [{message: '任务组名不能超过20长度' ,max:20}]}]"
              placeholder="请输入任务名称"
              autocomplete="off"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24">
          <a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol"
                       label="触发组名">
            <a-input
              v-decorator="['triggerGroup',{initialValue:schedule.triggerGroup,rules: [{ message: '触发组名不能超过20长度' ,max:20}]}]"
              placeholder="请输入触发组名"
              autocomplete="off"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol"
                       label="调度Bean名">
            <a-select
              showSearch
              placeholder="请选择" :disabled="schedule.beanName != null"
              v-decorator="['beanName',{initialValue:schedule.beanName,rules:[{required: true,message:'请选择调度名'}]}]">
              <a-select-option v-for="item in taskBeans" :value="item">{{ item}}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item :label-col="{span:3}" :wrapper-col="{span: 9}"
                       label="调度参数">
            <a-textarea placeholder="请输入调度参数... "
                        v-decorator="['params',{initialValue:schedule.params,rules: [{max:200,message:'最长不能超过300字'}]}]"
                        :autosize="{minRows: 2,maxRows:5}"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="{span:9}"
                     label="cron表达式">
          <a-col :span="18">
            <a-input placeholder="请输入cron表达式"
                     v-decorator="['cronExpression',{initialValue:schedule.cronExpression,rules: [{ required: true, message: 'cron表达式必填' }]}]"
                     autocomplete="off">
            </a-input>
          </a-col>
          <a-col :span="6" :style="{padding: '0 20px'}">
            <a-tooltip placement="topLeft" title="不知道怎么填？？？点击帮助">
              <a href="http://cron.qqe2.com" target="_blank">
                <a-icon type="question-circle"/>&nbsp;帮助
              </a>
            </a-tooltip>
          </a-col>
        </a-form-item>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol" label="是否启动">
            <a-switch :checked="schedule.state === 1"
                      @change="schedule.state ===1 ? schedule.state = 2 : schedule.state = 1"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item :label-col="{span:3}" :wrapper-col="{span: 9}" label="描述">
            <a-textarea placeholder="请输入描述信息... "
                        v-decorator="['remark',{initialValue:schedule.remark,rules: [{max:200,message:'最长不能超过200字'}]}]"
                        :autosize="{minRows: 2,maxRows:5}"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item :label-col="{span:4}" :wrapper-col="{span:8,offset:4}">
            <a-button type="primary" @click="handleSubmit">
              <a-icon type="save"/>
              保存
            </a-button>
            <router-link to="/schedule">
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
  import {findById, getTaskBeans, saveOrUpdate} from "@/network/schedule";

  const formItemLayout = {
    labelCol: {span: 3},
    wrapperCol: {span: 9}
  };
  export default {
    name: "ScheduleEdit",
    data() {
      return {
        loading: false,
        formItemLayout,
        taskBeans: [],
        schedule: {
          state: 1,
          jobGroup: "default",
          triggerGroup: "default"

        }
      }
    },
    beforeCreate() {
      this.form = this.$form.createForm(this)
    },
    created() {
      getTaskBeans().then(response => {
        this.taskBeans = response.data;
      });
      let id = this.$route.query.id;
      if (id) {
        findById(id).then(response => {
          this.schedule = response.data;
        })
      }
    },
    methods: {
      handleSubmit() {
        this.form.validateFields((errors, values) => {
          if (!errors) {
            this.loading = true;
            saveOrUpdate(Object.assign(this.schedule, this.form.getFieldsValue()))
              .then(response => {
                this.$message.success(response.message);
                this.$router.replace("/schedule");
              }).finally(() => this.loading = false);
          }
        });
      }
    }
  }
</script>

<style scoped>

</style>

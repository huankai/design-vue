<template>
  <a-form>
    <a-row :gutter="16">
      <a-col :span="24">
        <a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol"
                     label="任务名称">
          jobName1
        </a-form-item>
      </a-col>

    </a-row>
    <a-row :gutter="16">
      <a-col :span="24">
        <a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol"
                     label="任务组名">default
        </a-form-item>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="24">
        <a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol"
                     label="触发组名">default
        </a-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="16">
      <a-col :span="24">
        <a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol"
                     label="调度Bean名">
          taskJob1
        </a-form-item>
      </a-col>
      <a-col :span="24">
        <a-form-item :label-col="{span:3}" :wrapper-col="{span: 9}"
                     label="调度参数">
          18888888888
        </a-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="16">
      <a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="{span:9}"
                   label="cron表达式">
        */5 * * * * ?
      </a-form-item>
    </a-row>
    <a-row :gutter="16">
      <a-col :span="24">
        <a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol" label="状态">
          已启动
        </a-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="16">
      <a-col :span="24">
        <a-form-item :label-col="{span:3}" :wrapper-col="{span: 9}" label="描述">
          描述信息
        </a-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="16">
      <a-col :span="24">
        <a-form-item :label-col="{span:4}" :wrapper-col="{span:8,offset:4}">
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
</template>

<script>
    const formItemLayout = {
        labelCol: {span: 3},
        wrapperCol: {span: 9}
    };
    export default {
        name: "ScheduleDetail",
        data() {
            return {
                formItemLayout
            }
        },
    }
</script>

<style scoped>

</style>

<template>
  <a-spin :spinning="loading" tip="保存中...">
    <a-form :form="form">
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol"
                       label="所属应用">
            <a-select placeholder="请选择应用" :disabled="resource.id != null"
                      v-decorator="['appId',{initialValue:resource.appId, rules: [{ required: true,message: '所属应用必选'}]}]">
              <a-select-option v-for="item in appList" :key="item.id" :disabled="item.disabled">{{ item.name}}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item :label-col="formItemLayout.labelCol" has-feedback :wrapper-col="formItemLayout.wrapperCol"
                       label="资源名称">
            <a-input
              v-decorator="['resourceName',{initialValue:resource.resourceName, rules: [{ required: true,message: '权限编号必填，且不能超过 20 长度',max:20,whitespace:true }]}]"
              placeholder="请输入资源名称" autocomplete="off"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item :label-col="formItemLayout.labelCol" has-feedback :wrapper-col="formItemLayout.wrapperCol"
                       label="资源地址">
            <a-input
              v-decorator="['resourceUri',{initialValue:resource.resourceUri, rules: [{ required: true,message: '资源地址必填，且不能超过 20 长度',max:20,whitespace:true }]}]"
              placeholder="请输入资源地址" autocomplete="off"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol"
                       label="所属上级">
            <a-input disabled placeholder="请点击选择" autocomplete="off"
                     v-decorator="['parentName',{initialValue:resource.parentName,}]">
              <a-button slot="addonAfter" type="primary" @click="showParentMenuModal">
                <a-icon type="select"/>&nbsp;请选择
              </a-button>
            </a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol"
                       label="资源类型">
            <a-select placeholder="请选择资源类型"
                      v-decorator="['resourceType',{initialValue:resource.resourceType}]">
              <a-select-option v-for="item in menuTypes" :key="item.value">{{ item.text}}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol"
                       label="资源排序">
            <a-input-number :min="1" :max="1000" v-decorator="['ordered',{initialValue:resource.ordered}]"
                            @change="value => this.resource.ordered = value"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item :label-col="formItemLayout.labelCol" has-feedback :wrapper-col="formItemLayout.wrapperCol"
                       label="资源Icon">
            <a-input
              v-decorator="['icon',{initialValue:resource.icon, rules: [{ required: false,message: '资源Icon不能超过 10 长度',max:10,whitespace:true }]}]"
              placeholder="请输入资源Icon" autocomplete="off"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item :label-col="formItemLayout.labelCol" has-feedback :wrapper-col="formItemLayout.wrapperCol"
                       label="描述">
            <a-textarea placeholder="请输入描述信息..."
                        v-decorator="['description',{initialValue:resource.description, rules: [{max:200,message:'最长不能超过200字'}]}]"
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
            <router-link to="/menu">
              <a-button type="default">
                <a-icon type="undo"/>
                返回
              </a-button>
            </router-link>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <a-modal title="请选择上级" :visible="visibleParentModal" @ok="visibleParentModal = false"
             @cancel="visibleParentModal = false" :destroyOnClose="true" :maskClosable="false">
      <div>
        <a-tree :treeData="menuTreeData" :loadData="onLoadMenuData" @select="parentMenuOnSelect"></a-tree>
      </div>
    </a-modal>
  </a-spin>
</template>

<script>

  import {getSelectOption} from "@/network/clientApp";
  import {findById, findTreeListByAppId, saveOrUpdate} from "@/network/menu";

  const menuTypes = [{
    value: 1,
    text: "目录"
  }, {
    value: 2,
    text: "按钮"
  }];
  const formItemLayout = {
    labelCol: {span: 3},
    wrapperCol: {span: 9}
  };
  export default {
    name: "MenuEdit",
    data() {
      return {
        loading: false,
        formItemLayout,
        appList: [],
        menuTypes,
        resource: {ordered: 1, resourceType: 1},
        visibleParentModal: false,
        menuTreeData: []
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
          this.resource = response.data;
        })
      }
    },
    methods: {
      showParentMenuModal() {
        const appId = this.form.getFieldValue("appId");
        if (appId) {
          this.visibleParentModal = true;
          findTreeListByAppId(appId).then(response => {
            this.menuTreeData = response.data;
          })
        } else {
          this.$message.info("请先选择所属应用")
        }
      },
      onLoadMenuData(treeNode) {

      },
      parentMenuOnSelect(selectedKeys, info) {
        const props = info.selectedNodes[0].data.props;
        this.resource.parentId = props.value;
        this.form.setFieldsValue({
          parentName: props.title
        })
      },
      handleSubmit() {
        this.form.validateFields((errors) => {
          if (!errors) {
            this.loading = true;
            let data = Object.assign(this.resource, this.form.getFieldsValue());
            saveOrUpdate(data).then(response => {
              this.$message.success(response.message);
              this.$router.replace("/menu");
            }).finally(() => this.loading = false);
          }
        });
      }
    }
  }
</script>

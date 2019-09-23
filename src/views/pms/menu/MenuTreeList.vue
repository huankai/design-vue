<template>
  <div>
    <div class="search">
      <a-row>
        <a-col :span="6">
          <label>
            <span class="field">应用名称: </span>
            <a-select style="width: 60%" placeholder="请选择"
                      @change="handlerAppChange">
              <a-select-option v-for="item in appList" :key="item.id" :disabled="item.disabled">{{ item.name}}
              </a-select-option>
            </a-select>
          </label>
        </a-col>
        <a-col :span="12">
          <div>
            <router-link to="/menu">
              <a-button type="primary" icon="table">表格显示</a-button>
            </router-link>
          </div>
        </a-col>
      </a-row>
      <a-divider dashed/>
    </div>
    <div>
      <a-row>
        <a-col :span="6" style="border-right:1px dashed #e8e8e8;">
          <a-tree :treeData="treeData" :loadData="onLoadData" :loadedKeys="loadedKeys" @select="handleSelect">
            <template slot="custom" slot-scope="selected">
              <span>{{selected.title}}</span>
              <!--              <a-popconfirm placement="topLeft" title="编辑">-->
              <!--                <a-icon type="edit" :style="{'color':'#1890ff'}"/>-->
              <!--              </a-popconfirm>-->
              <a-popconfirm title="确定要删除吗？" placement="bottom" @confirm="handlerDelete(selected)">
                <a-tooltip placement="topLeft" title="删除">
                  <a-icon type="delete" :style="{color: 'red'}"/>
                </a-tooltip>
              </a-popconfirm>
            </template>
          </a-tree>
        </a-col>
        <a-col :span="18" v-show="resource.id != null">
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
                      <a-button slot="addonAfter" type="primary">
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
                    <a-button type="primary">
                      <a-icon type="save"/>
                      保存
                    </a-button>
                  </a-form-item>
                </a-col>
              </a-row>
            </a-form>
          </a-spin>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
  import {getSelectOption} from "@/network/clientApp";
  import {findById, findChild} from "@/network/menu";

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
    name: "MenuTreeList",
    data() {
      return {
        appList: [],
        treeData: [],
        params: {},
        loadedKeys: [],
        loading: false,
        formItemLayout,
        menuTypes,
        resource: {}
      }
    },
    created() {
      getSelectOption().then(response => this.appList = response.data);
      this.form = this.$form.createForm(this);
    },
    methods: {
      handlerAppChange(value) {
        this.loadedKeys = [];
        findChild(value).then(response => this.treeData = response.data);
      },
      handlerDelete(selected) {
        this.$message.info(selected.key);
      },
      handleSelect(selectedKeys, info) {
        findById(selectedKeys[0]).then(response => this.resource = response.data);
      },
      onLoadData(treeNode) {
        this.loadedKeys.push(treeNode.value);
        return new Promise(resolve => {
          findChild(null, treeNode.value)
            .then(response => {
              response.data.forEach(item => {
                item.scopedSlots = {
                  title: 'custom'
                }
              });
              treeNode.dataRef.children = response.data;
              this.treeData = [...this.treeData];
              resolve();
            })

        });
      }
    }
  }
</script>

<style scoped>
  .ant-tree-title span {
    margin-right: 8px;
  }

  .ant-tree-title i {
    margin-right: 8px;
  }
</style>

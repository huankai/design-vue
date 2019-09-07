<template>
  <a-spin :spinning="loading" tip="保存中...">
    <a-form :form="form">
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item :label-col="formItemLayout.labelCol" has-feedback :wrapper-col="formItemLayout.wrapperCol"
                       label="机构编号">
            <a-input
              v-decorator="['orgCode',{initialValue:org.orgCode, rules: [{ required: true, message: '机构编号必填，不能为空格，且不能超过20长度',max:20,whitespace:true  }]}]"
              placeholder="请输入机构编号"
              autocomplete="off"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item :label-col="{span: 8}" has-feedback :wrapper-col="{span:16}"
                       label="机构名称">
            <a-input
              v-decorator="['orgName',{initialValue:org.orgName, rules: [{ required: true, message: '机构名称必填，不能为空格，且不能超过20长度',max:20,whitespace:true }]}]"
              placeholder="请输入机构名称" autocomplete="off"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item :label-col="formItemLayout.labelCol" has-feedback :wrapper-col="formItemLayout.wrapperCol"
                       label="法人姓名">
            <a-input
              v-decorator="['legalName',{initialValue:org.legalName, rules: [{ required: true, message: '法人姓名必填，不能为空格，且不能超过20长度',max:20,whitespace:true  }]}]"
              placeholder="请输入法人姓名"
              autocomplete="off"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item :label-col="{span: 8}" has-feedback :wrapper-col="{span:16}" label="法人手机">
            <a-input
              v-decorator="['legalPhone',{initialValue:org.legalPhone, rules: [{ required: true,validator:this.$validator.isPhone, message: '法人手机必须为有效的手机号',max:20,whitespace:true }]}]"
              placeholder="请输入法人手机" autocomplete="off"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol"
                       label="上级机构">
            <a-input v-decorator="['parentName',{initialValue:org.parentName}]" disabled placeholder="请选择"
                     autocomplete="off">
              <a-button slot="addonAfter" type="primary" @click="showParentOrgModal">
                <a-icon type="select"/>&nbsp;请选择
              </a-button>
            </a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item :label-col="{span: 8}" has-feedback :wrapper-col="{span:16}" label="是否有效">
            <a-switch :checked="org.state" @change="org.state = !org.state"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item :label-col="formItemLayout.labelCol" has-feedback :wrapper-col="formItemLayout.wrapperCol"
                       label="机构标签">
            <a-input
              v-decorator="['orgTag',{initialValue:org.orgTag, rules: [{ message: '机构标签不能超过20长度',max:20,whitespace:true }]}]"
              placeholder="请输入机构标签" autocomplete="off"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item :label-col="{span:3}" :wrapper-col="{span: 9}" label="机构地址">
            <!--            <address-cascader :max-depth="3" :form="form"-->
            <!--                              :decorator="['provinceId',{rules: [{required: true,type: 'array', message: '机构标签不能超过20长度'}]}]"/>-->
            <!--
              type: array
              len: 验证 array 的长度
            -->
            <a-cascader :options="addressOptions" :loadData="addressLoadData" placeholder="请选择"
                        v-decorator="['provinceId',{rules: [{required: true,type: 'array',len:maxDepth, message: '省市区必选'}]}]"
                        :changeOnSelect="true"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item :label-col="{span:3}" :wrapper-col="{span: 9}" label="详细地址">
            <a-input
              v-decorator="['address',{initialValue:org.address, rules: [{ message: '详细地址不能超过100长度',max:100,whitespace:true }]}]"
              placeholder="请输入详细地址" autocomplete="off"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item :label-col="{span:3}" :wrapper-col="{span: 9}" label="描述">
            <a-textarea placeholder="请输入描述信息..."
                        v-decorator="['description',{initialValue:org.description, rules: [{max:200,message:'最长不能超过200字'}]}]"
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
            <router-link to="/org">
              <a-button type="default">
                <a-icon type="undo"/>
                返回
              </a-button>
            </router-link>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <a-modal title="选择上级机构" :visible="parentOrgVisible" @ok="parentOrgVisible = false"
             @cancel="parentOrgVisible = false">
      <p>
        <organization-tree :currentOrgId="this.$route.query.id" :show-search="false"
                           @onSelect="organizationTreeOnSelect"/>
      </p>
    </a-modal>
  </a-spin>
</template>

<script>
  import OrganizationTree from "@/views/pms/org/OrganizationTree";
  import {childs, findByParentId, findProvinceList} from "@/network/address";
  import {findById, saveOrUpdate} from "@/network/organization";

  const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 18}
  };
  const formTailLayout = {
    labelCol: {span: 4},
    wrapperCol: {span: 8, offset: 4}
  };
  export default {
    name: "OrganizationEdit",
    components: {OrganizationTree},
    data() {
      return {
        loading: false,
        formItemLayout,
        formTailLayout,
        parentOrgVisible: false,
        org: {
          state: true,
        },
        maxDepth: 3,//最多选择多少级
        addressOptions: []
      };
    },
    beforeCreate() {
      this.form = this.$form.createForm(this);
    },
    created() {
      const id = this.$route.query.id;
      if (id) {
        findById(id).then(response => {
          this.org = response.data;
          const ids = [response.data.provinceId, response.data.cityId, response.data.areaId];
          childs(ids.join()).then(response => {
            this.addressOptions = response.data;
          });
          this.form.setFieldsValue({
            provinceId: ids,
            parentName: response.data.parentName
          })
        })
      } else {
        this.loadAddressList();
      }
    },
    methods: {
      organizationTreeOnSelect(selected) {
        this.org.parentId = selected.id;
        this.form.setFieldsValue({
          parentName: selected.orgName
        })
      },
      showParentOrgModal() {
        this.parentOrgVisible = true
      },

      loadAddressList() {
        findProvinceList().then(response => {
          this.addressOptions = response.data;
        });
      },
      addressLoadData(selectedOptions) {
        if (selectedOptions.length < this.maxDepth) {
          const selectOption = selectedOptions[selectedOptions.length - 1];
          selectOption.loading = true;
          findByParentId(selectOption.value, this.maxDepth).then(response => {
            if (response.data.length > 0) {
              selectOption.children = response.data;
              this.addressOptions = [...this.addressOptions];
            }
            selectOption.loading = false;
          });
        }
      },
      handleSubmit() {
        this.form.validateFields((errors) => {
          if (!errors) {
            this.loading = true;
            let data = Object.assign(this.org, this.form.getFieldsValue());
            let provinceArray = data.provinceId;
            data.provinceId = provinceArray[0];
            data.cityId = provinceArray[1];
            data.areaId = provinceArray[2];
            saveOrUpdate(data).then(response => {
              this.$message.success(response.message);
              this.$router.replace("/org");
            }).finally(() => this.loading = false);
          }
        });
      }
    }
  }
</script>

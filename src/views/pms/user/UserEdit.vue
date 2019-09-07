<template>
  <a-spin :spinning="loading" tip="保存中...">
    <a-form :form="form">
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item :label-col="formItemLayout.labelCol" has-feedback :wrapper-col="formItemLayout.wrapperCol"
                       label="用户账号">
            <a-input
              v-decorator="['account',{initialValue:user.account, rules: [{ required: true, message: '用户账号必填，不能为空格，且不能超过20长度',max:20,whitespace:true  }]}]"
              placeholder="请输入用户账号"
              autocomplete="off"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item :label-col="{span: 8}" has-feedback :wrapper-col="{span:16}"
                       label="用户手机">
            <a-input
              v-decorator="['phone',{initialValue:user.phone, rules: [{ required: true, message: '用户手机格式不正确',validator:this.$validator.isPhone, whitespace:true }]}]"
              placeholder="请输入用户手机" autocomplete="off"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item :label-col="formItemLayout.labelCol" has-feedback :wrapper-col="formItemLayout.wrapperCol"
                       label="用户姓名">
            <a-input
              v-decorator="['realName',{initialValue:user.realName, rules: [{ required: true,message: '用户姓名必填，且不能超过 20 长度',max:20,whitespace:true }]}]"
              placeholder="请输入用户姓名" autocomplete="off"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item :label-col="{span: 8}" has-feedback :wrapper-col="{span:16}" label="用户密码"
                       v-if="this.$route.query.id == null">
            <a-input type="password"
                     v-decorator="['password',{rules: [{ required: true, message: '密码必填，不能为空格，且长度在 8 ~ 20之间',min:8,max:20,whitespace:true  }]}]"
                     placeholder="请输入用户密码"
                     autocomplete="off"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item :label-col="formItemLayout.labelCol" has-feedback :wrapper-col="formItemLayout.wrapperCol"
                       label="用户邮箱">
            <a-input
              v-decorator="['email',{initialValue:user.email,rules: [{ message: '邮箱格式不正确',type:'email',whitespace:true  }]}]"
              placeholder="请输入用户邮箱"
              autocomplete="off"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item :label-col="{span: 8}" :wrapper-col="{span:16}" label="用户性别">
            <a-radio-group name="userSex" :value="user.sex" @change="user.sex = (user.sex === 1 ? 2 : 1)">
              <a-radio :value="1">男</a-radio>
              <a-radio :value="2">女</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol"
                       label="用户类型">
            <a-select
              showSearch
              placeholder="请选择" @change="value => user.userType = value"
              v-decorator="['userType',{initialValue:user.userType,rules:[{required:true,message:'用户类型必选'}]}]">
              <a-select-option v-for="item in userTypeList" :value="item.value">{{ item.text }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-if="user.userType !== 1" :label-col="{span: 8}" :wrapper-col="{span:16}" label="用户机构">
            <a-input disabled placeholder="请选择" autocomplete="off"
                     v-decorator="['orgName',{initialValue:user.orgName,rules: [{required:user.userType !== 1,message: '机构必选'}]}]">
              <a-button slot="addonAfter" type="primary" @click="showParentOrgModal">
                <a-icon type="select"/>&nbsp;请选择
              </a-button>
            </a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item :label-col="formItemLayout.labelCol" has-feedback :wrapper-col="formItemLayout.wrapperCol"
                       label="用户生日">
            <a-date-picker :disabledDate="disabledDate"></a-date-picker>
          </a-form-item>
        </a-col>
        <!--<a-col :span="12">
          <a-form-item :label-col="{span: 8}" :wrapper-col="{span:16}" label="用户地址">
            <a-cascader :options="addressOptions" :loadData="addressLoadData" placeholder="请选择"
                        v-decorator="['provinceId',{rules: [{required: true,type: 'array',len:maxDepth, message: '省市区必选'}]}]"
                        :changeOnSelect="true"/>
          </a-form-item>
        </a-col>-->
        <a-col :span="12">
          <a-form-item :label-col="{span: 8}" :wrapper-col="{span:16}" label="是否启用">
            <a-switch :checked="user.userStatus === 1" @change="user.userStatus = (user.userStatus === 1 ? 0 : 1)"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item :label-col="formItemLayout.labelCol" has-feedback :wrapper-col="formItemLayout.wrapperCol"
                       label="用户头像">
            <div class="clearfix">
              <a-upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                :fileList="fileList"
                @preview="handlePreview"
                @change="handleChange">
                <div v-if="fileList.length === 0">
                  <a-icon type="plus"/>
                  <div class="ant-upload-text">点击上传</div>
                </div>
              </a-upload>
            </div>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item :label-col="{span:3}" :wrapper-col="{span: 9}" label="描述">
            <a-textarea placeholder="请输入描述信息..."
                        v-decorator="['description',{initialValue:user.description, rules: [{max:200,message:'最长不能超过200字'}]}]"
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
            <router-link to="/users">
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
                           @onSelect="organizationTreeOnSelect"></organization-tree>
      </p>
    </a-modal>
  </a-spin>
</template>

<script>
  import {endOfDay} from "@/util/moments";
  import {findByParentId, findProvinceList} from "@/network/address";
  import {findById, getByUserTypes, saveOrUpdate} from "@/network/user";
  import OrganizationTree from "@/views/pms/org/OrganizationTree";

  const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 18}
  };
  const formTailLayout = {
    labelCol: {span: 4},
    wrapperCol: {span: 8, offset: 4}
  };
  export default {
    name: "UserEdit",
    components: {OrganizationTree},
    data() {
      return {
        loading: false,
        formItemLayout,
        formTailLayout,
        fileList: [],
        userTypeList: [],
        parentOrgVisible: false,
        user: {
          userStatus: 1,
          userType: 3,
          sex: 1
        },
        disabledDate(current) {
          return current && current > endOfDay();
        }
      };
    },
    beforeCreate() {
      this.form = this.$form.createForm(this);
    },
    created() {
      const id = this.$route.query.id;
      if (id) {
        findById(id).then(response => this.user = response.data);
      }
      getByUserTypes().then(response => {
        this.userTypeList = response.data
      });
    },
    methods: {
      handlePreview(file) {

      },
      handleChange({fileList}) {
        this.fileList = fileList
      },
      organizationTreeOnSelect(selected) {
        this.user.orgId = selected.id;
        this.form.setFieldsValue({
          orgName: selected.orgName
        })
      },
      showParentOrgModal() {
        this.parentOrgVisible = true
      },
      handleSubmit() {
        this.form.validateFields((errors) => {
          if (!errors) {
            this.loading = true;
            let data = Object.assign(this.user, this.form.getFieldsValue());
            saveOrUpdate(data).then(response => {
              this.$message.success(response.message);
              this.$router.replace("/users");
            }).finally(() => this.loading = false);
          }
        });
      }
    }
  }
</script>

<style scoped>

</style>

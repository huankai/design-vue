<template>
  <a-spin :spinning="loading" tip="保存中...">
    <a-form :form="form">
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item :label-col="formItemLayout.labelCol" has-feedback :wrapper-col="formItemLayout.wrapperCol"
                       label="自定义编号">
            <a-input
              v-decorator="['code',{initialValue: addressData.code,rules: [{ required: true, message: '地址编号必填,不能为空格，且不能超过20长度',max: 20,whitespace:true}]}]"
              placeholder="请输入自定义编号"
              autocomplete="off"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item :label-col="formItemLayout.labelCol" has-feedback :wrapper-col="formItemLayout.wrapperCol"
                       label="地址编号">
            <a-input
              v-decorator="['areaCode',{initialValue: addressData.areaCode,rules: [{ required: true, message: '地址编号必填，不能为空格，且不能超过20长度',max:20,whitespace:true }]}]"
              placeholder="请输入地址编号" autocomplete="off"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item :label-col="formItemLayout.labelCol" has-feedback :wrapper-col="formItemLayout.wrapperCol"
                       label="地址全称">
            <a-input
              v-decorator="['fullName',{initialValue: addressData.fullName,rules: [{ required: true, message: '地址全称必填，不能为空格，且不能超过20长度',max:20,whitespace:true }]}]"
              placeholder="请输入地址名称" autocomplete="off"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item :label-col="formItemLayout.labelCol" has-feedback :wrapper-col="formItemLayout.wrapperCol"
                       label="地址拼音">
            <a-input
              v-decorator="['pinyin',{initialValue: addressData.pinyin,rules: [{ required: true, message: '地址拼音必填，不能为空格，且不能超过20长度',max:20,whitespace:true }]}]"
              placeholder="请输入地址拼音" autocomplete="off"/>
          </a-form-item>
        </a-col>

      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-item :label-col="formItemLayout.labelCol" has-feedback :wrapper-col="formItemLayout.wrapperCol"
                       label="地址简称">
            <a-input
              v-decorator="['shortName',{initialValue: addressData.shortName,rules: [{message: '地址全称不能为空格，且不能超过20长度',max:20,whitespace:true }]}]"
              placeholder="请输入地址简称" autocomplete="off"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item :label-col="formItemLayout.labelCol" has-feedback :wrapper-col="formItemLayout.wrapperCol"
                       label="邮政编码">
            <a-input
              v-decorator="['postOffice',{initialValue: addressData.postOffice,rules: [{message: '邮政编码不能为空格，且不能超过10长度',max:10,whitespace:true }]}]"
              placeholder="请输入邮政编码" autocomplete="off"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol" label="城市类型">
            <a-select
              showSearch
              placeholder="城市类型"
              optionFilterProp="children"
              style="width: 200px"
              :value="addressData.cityType"
              :defaultValue="1">
              <a-select-option v-for="item in cityTypeOptions" :value="item.value">{{ item.name}}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol" label="所属上级">
            <a-input disabled placeholder="请点击选择" autocomplete="off"
                     v-decorator="['parentId',{rules: [{required:true,message: '上级不能为空'}]}]">
              <a-button slot="addonAfter" type="primary" @click="showParentAddressModal">
                <a-icon type="select"/>&nbsp;请选择
              </a-button>
            </a-input>
            <!--            <a-select-->
            <!--              showSearch-->
            <!--              placeholder="所属上级"-->
            <!--              optionFilterProp="children"-->
            <!--              style="width: 200px"-->
            <!--              :defaultValue="1">-->
            <!--              <a-select-option v-for="item in cityTypeOptions" :value="item.value">{{ item.name}}-->
            <!--              </a-select-option>-->
            <!--            </a-select>-->
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-item :label-col="formItemLayout.labelCol" has-feedback :wrapper-col="formItemLayout.wrapperCol"
                       label="经度">
            <a-input
              v-decorator="['longitude',{initialValue: addressData.longitude,rules: [{pattern: 6,max:200,whitespace:true,min: 1,validator: this.$validator.isFloat}]}]"
              placeholder="请输入地址经度" autocomplete="off"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item :label-col="formItemLayout.labelCol" has-feedback :wrapper-col="formItemLayout.wrapperCol"
                       label="纬度">
            <!--
              antd 使用 async-validator 在验证时，不会将 input 中的数据转换为指定的数字类型，可以使用  transform 转换
              v-decorator="['latitude',{rules: [{type: 'integer',transform: value => +value}]}]" 验证 integer 类型
             -->
            <a-input
              v-decorator="['latitude',{initialValue: addressData.latitude,rules: [{pattern: 6,max:200,min: 1,validator: this.$validator.isFloat}]}]"
              placeholder="请输入纬度" autocomplete="off"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item :label-col="{span:3}" :wrapper-col="{span: 9}" label="描述">
            <a-textarea placeholder="请输入描述信息... " v-model="addressData.description" :autosize="{minRows: 2,maxRows:5}"/>
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
            <router-link to="/address">
              <a-button type="default">
                <a-icon type="undo"/>
                返回
              </a-button>
            </router-link>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <a-modal title="请选择上级" v-model="visibleParentModal" @ok="handleOk">
      <div>
        <a-input-search style="margin-bottom: 8px" placeholder="请输入名称搜索" @change="handlerSearchOnChange"/>
        <a-tree :treeData="addressData"></a-tree>
      </div>
    </a-modal>
  </a-spin>
</template>

<script>
    import {findById} from "@/network/address";

    const formItemLayout = {
        labelCol: {span: 6},
        wrapperCol: {span: 18}
    };
    const formTailLayout = {
        labelCol: {span: 4},
        wrapperCol: {span: 8, offset: 4}
    };
    const addressData = [{
        title: '0-0',
        key: '0-0',
        children: [{
            title: '0-0-0',
            key: '0-0-0',
            children: [
                {title: '0-0-0-0', key: '0-0-0-0'},
                {title: '0-0-0-1', key: '0-0-0-1'},
                {title: '0-0-0-2', key: '0-0-0-2'},
            ],
        }, {
            title: '0-0-1',
            key: '0-0-1',
            children: [
                {title: '0-0-1-0', key: '0-0-1-0'},
                {title: '0-0-1-1', key: '0-0-1-1'},
                {title: '0-0-1-2', key: '0-0-1-2'},
            ],
        }, {
            title: '0-0-2',
            key: '0-0-2',
        }],
    }, {
        title: '0-1',
        key: '0-1',
        children: [
            {title: '0-1-0-0', key: '0-1-0-0'},
            {title: '0-1-0-1', key: '0-1-0-1'},
            {title: '0-1-0-2', key: '0-1-0-2'},
        ],
    }, {
        title: '0-2',
        key: '0-2',
    }];
    const cityTypeOptions = [
        {
            name: "国家",
            value: 0,
        }, {
            name: "省",
            value: 1,
        }, {
            name: "市",
            value: 2,
        }, {
            name: "区/县",
            value: 3,
        }, {
            name: "镇/乡",
            value: 4,
        }
    ];
    export default {
        name: "AddressEdit",
        data() {
            return {
                visibleParentModal: false,
                loading: false,
                address: {latitude: 0},
                addressData,
                formItemLayout,
                formTailLayout,
                cityTypeOptions
            };
        },
        beforeCreate() {
            this.form = this.$form.createForm(this)
        },
        created() {
            findById(this.$route.query.id).then(response => {
                this.addressData = response.data;
                console.log(this.addressData)
            })
        },
        methods: {
            floatValidate(rule, value, callback) {
                if (!isNaN(parseFloat(value))) {
                    callback();
                }
                callback("不是合法的小数")

            },
            handleOk() {
                this.$message.info("正在开发中...")
            },
            showParentAddressModal() {
                this.visibleParentModal = true;
            },
            handlerSearchOnChange() {
                this.$message.info("正在开发中...")
            },
            showSecret() {
                this.$message.info("正在开发中...")
            },
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
                        this.loading = true;
                        setTimeout(() => {
                            this.loading = false;
                            this.$router.replace("/app");
                        }, 1500);
                    }
                });
            }
        }
    }
</script>

<style scoped>

</style>

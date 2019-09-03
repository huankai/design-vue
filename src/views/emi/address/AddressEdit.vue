<template>
  <a-spin :spinning="loading" tip="保存中...">
    <a-form :form="form">
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item :label-col="formItemLayout.labelCol" has-feedback :wrapper-col="formItemLayout.wrapperCol"
                       label="自定义编号">
            <a-input
              v-decorator="['code',{initialValue:addressData.code, rules: [{required: true, message: '地址编号必填,不能为空格，且不能超过20长度',max: 20,whitespace:true}]}]"
              placeholder="请输入自定义编号"
              autocomplete="off"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item :label-col="formItemLayout.labelCol" has-feedback :wrapper-col="formItemLayout.wrapperCol"
                       label="地址编号">
            <a-input
              v-decorator="['areaCode',{initialValue:addressData.areaCode, rules: [{required: true, message: '地址编号必填，不能为空格，且不能超过20长度',max:20,whitespace:true }]}]"
              placeholder="请输入地址编号" autocomplete="off"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item :label-col="formItemLayout.labelCol" has-feedback :wrapper-col="formItemLayout.wrapperCol"
                       label="地址全称">
            <a-input
              v-decorator="['fullName',{initialValue:addressData.fullName,rules: [{ required: true, message: '地址全称必填，不能为空格，且不能超过20长度',max:20,whitespace:true }]}]"
              placeholder="请输入地址名称" autocomplete="off"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item :label-col="formItemLayout.labelCol" has-feedback :wrapper-col="formItemLayout.wrapperCol"
                       label="地址拼音">
            <a-input
              v-decorator="['pinyin',{initialValue:addressData.pinyin,rules: [{ required: true, message: '地址拼音必填，不能为空格，且不能超过20长度',max:20,whitespace:true }]}]"
              placeholder="请输入地址拼音" autocomplete="off"/>
          </a-form-item>
        </a-col>

      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-item :label-col="formItemLayout.labelCol" has-feedback :wrapper-col="formItemLayout.wrapperCol"
                       label="地址简称">
            <a-input
              v-decorator="['shortName',{initialValue:addressData.shortName,rules: [{message: '地址全称不能为空格，且不能超过20长度',max:20,whitespace:true }]}]"
              placeholder="请输入地址简称" autocomplete="off"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item :label-col="formItemLayout.labelCol" has-feedback :wrapper-col="formItemLayout.wrapperCol"
                       label="邮政编码">
            <a-input
              v-decorator="['postOffice',{initialValue:addressData.postOffice,rules: [{message: '邮政编码不能为空格，且不能超过10长度',max:10,whitespace:true }]}]"
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
              v-decorator="['cityType',{initialValue:addressData.cityType}]"
              optionFilterProp="children"
              @change="handleCityTypeChange">
              <a-select-option v-for="item in cityTypeOptions" :value="item.value">{{ item.name}}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-if="showSelectParent" :label-col="formItemLayout.labelCol"
                       :wrapper-col="formItemLayout.wrapperCol" label="所属上级">
            <a-input disabled placeholder="请点击选择" autocomplete="off"
                     v-decorator="['parentName',{initialValue:addressData.parentName,rules: [{required:showSelectParent,message: '上级不能为空'}]}]">
              <a-button slot="addonAfter" type="primary" @click="showParentAddressModal">
                <a-icon type="select"/>&nbsp;请选择
              </a-button>
            </a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-item :label-col="formItemLayout.labelCol" has-feedback :wrapper-col="formItemLayout.wrapperCol"
                       label="经度">
            <a-input
              v-decorator="['longitude',{initialValue:addressData.longitude,rules: [{pattern: 6,max:200,whitespace:true,min: 1,validator: this.$validator.isFloat}]}]"
              placeholder="请输入地址经度" autocomplete="off"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item :data-index="addressData.latitude" :label-col="formItemLayout.labelCol" has-feedback
                       :wrapper-col="formItemLayout.wrapperCol"
                       label="纬度">
            <!--
              antd 使用 async-validator 在验证时，不会将 input 中的数据转换为指定的数字类型，可以使用  transform 转换
              v-decorator="['latitude',{rules: [{type: 'integer',transform: value => +value}]}]" 验证 integer 类型
             -->
            <a-input
              v-decorator="['latitude',{initialValue:addressData.latitude,rules: [{pattern: 6,max:200,min: 1,validator: this.$validator.isFloat}]}]"
              placeholder="请输入纬度" autocomplete="off"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item :label-col="{span:3}" :wrapper-col="{span: 9}" label="描述">
            <a-textarea placeholder="请输入描述信息... "
                        v-decorator="['description',{initialValue:addressData.description,rules: [{max:200,message:'最长不能超过200字'}]}]"
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
    <a-modal title="请选择上级" width="70%" :visible="visibleParentModal" @ok="visibleParentModal = false"
             @cancel="visibleParentModal = false">
      <div>
        <a-input-search style="margin-bottom: 8px" placeholder="请输入名称搜索" @search="handlerSearch"/>
        <a-table rowKey="id" :columns="parentColumns" :rowSelection="rowSelection" :loading="parentLoading"
                 :dataSource="parentData"
                 @change="handleTableChange"
                 :pagination="pagination">
        </a-table>
      </div>
    </a-modal>
  </a-spin>
</template>

<script>
  import {findById, getCityType} from "@/network/address";
  import {queryForPage, saveOrUpdate} from "@/network/address";
  import {PageQuery} from "@/util/pageQuery";

  const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 18}
  };
  const formTailLayout = {
    labelCol: {span: 4},
    wrapperCol: {span: 8, offset: 4}
  };

  export default {
    name: "AddressEdit",
    data() {
      return {
        visibleParentModal: false,
        loading: false,
        addressData: {
          cityType: 1
        },
        formItemLayout,
        formTailLayout,
        cityTypeOptions: [],
        rowSelection: {
          columnWidth: '5%',
          type: 'radio',
          selectedRowKeys: [],
          onChange: (selectedRowKeys, selectedRows) => {
            this.rowSelection.selectedRowKeys = selectedRowKeys;
            this.addressData.parentId = null;
            this.form.setFieldsValue({
              parentName: null
            });
          },
          onSelect: (record, selected, selectedRows) => {
            this.form.setFieldsValue({
              parentName: record.fullName
            });
            this.addressData.parentId = record.id;
          }
        },
        parentColumns: [{
          title: '自定义编号',
          align: 'center',
          dataIndex: 'code',
          width: '15%'
        }, {
          title: '编号(国标)',
          align: 'center',
          dataIndex: 'areaCode',
          width: '15%'
        }, {
          title: '名称',
          align: 'center',
          dataIndex: 'fullName',
          width: '15%'
        }, {
          title: '全称',
          align: 'center',
          dataIndex: 'mergerName',
          width: '25%'
        }
        ],
        parentLoading: false,
        parentData: [],
        parentSearchParam: {},
        pagination: {
          total: 0,
          current: 0,
          defaultPageSize: 10,
          showTotal: (total, range) => {
            return "共 " + total + " 条记录";
          },
          pageSizeOptions: ['10', '20', '50', '100'],
          showQuickJumper: true,
          showSizeChanger: true
        }
      };
    },
    beforeCreate() {
      this.form = this.$form.createForm(this);
    },
    created() {
      getCityType().then(response => {
        this.cityTypeOptions = response.data;
      });
      let id = this.$route.query.id;
      if (id) {
        findById(id).then(response => {
          this.addressData = response.data;
        })
      } else {
        let parentId = this.$route.query.parentId;
        if (parentId) {
          findById(parentId).then(response => {
            this.addressData.cityType = response.data.cityType + 1;
            this.addressData.parentId = parentId;
            this.addressData.parentName = response.data.fullName;
          })
        }
      }
    },
    computed: {
      showSelectParent() {
        return this.addressData.cityType !== 0;
      }
    },
    methods: {
      handleTableChange(pagination) {
        this.pagination.current = pagination.current;
        this.pagination.defaultPageSize = pagination.pageSize;
        this.loadParentData();
      },
      handleCityTypeChange(value) {
        this.addressData.cityType = value;
        this.addressData.parentId = null;
        this.addressData.parentName = null;
      },
      showParentAddressModal() {
        this.visibleParentModal = true;
        this.parentSearchParam.fullName = null;
        this.loadParentData();
      },
      loadParentData(fullName) {
        this.parentLoading = true;
        this.parentSearchParam.cityType = this.addressData.cityType - 1;
        this.parentSearchParam.fullName = fullName;
        queryForPage(new PageQuery(this.parentSearchParam, this.pagination.current, this.pagination.defaultPageSize))
          .then(response => {
            this.parentData = response.data.data;
            this.pagination.total = response.data.totalRow;
            this.rowSelection.selectedRowKeys = [this.addressData.parentId];
          }).finally(() => this.parentLoading = false);
      },
      handlerSearch(value) {
        this.loadParentData(value);
      },
      handleSubmit() {
        this.form.validateFields((errors, values) => {
          if (!errors) {
            this.loading = true;
            saveOrUpdate(Object.assign(this.addressData, this.form.getFieldsValue()))
              .then(response => {
                this.$message.success(response.message || "保存成功");
                this.$router.replace("/address");
              }).finally(() => this.loading = false);
          }
        });
      }
    }
  }
</script>

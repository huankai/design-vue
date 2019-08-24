<template>
  <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }">
    <div class="search">
      <a-row>
        <date-search/>
      </a-row>
      <a-divider dashed/>
      <a-row>
        <a-col :span="8">
          <label>
            <span class="field">用户名: </span>
            <a-input placeholder="请输入用户名搜索"></a-input>
          </label>
        </a-col>
        <a-col :span="8">
          <label>
            <span class="field">用户类型: </span>
            <a-input placeholder="用户类型"></a-input>
          </label>
        </a-col>
        <a-col :span="8">
          <label>
            <span class="field">用户类型: </span>
            <a-input placeholder="用户类型"></a-input>
          </label>
        </a-col>
      </a-row>
      <a-divider dashed/>
      <a-row>
        <a-col :span="8">
          <label>
            <span class="field">用户类型2: </span>
            <a-select
              showSearch
              placeholder="请输入关键字搜索"
              optionFilterProp="children"
              style="width: 50%"
              :allowClear="true"
              @focus="handleFocus"
              @blur="handleBlur"
              @change="handleChange"
              :filterOption="filterOption"
            >
              <a-select-option value="1">普通用户</a-select-option>
              <a-select-option value="2">管理员</a-select-option>
              <a-select-option value="3">其它</a-select-option>
            </a-select>
          </label>
        </a-col>
        <a-col :span="8">
          <div>
            <a-button type="primary" icon="search">搜索</a-button>
            <a-popconfirm title="确定要删除缓存吗？" @confirm="deleteCache">
              <a-icon slot="icon" type="question-circle" style="color:red"/>
              <a-button type="danger" :loading="deleteCacheLoading" icon="delete">清除缓存</a-button>
            </a-popconfirm>
            <a-button type="primary" icon="plus">添加</a-button>
          </div>
        </a-col>
      </a-row>
      <a-divider dashed/>
    </div>
    <div>
      <a-table :columns="columns" :dataSource="data" @change="handleChange"/>
    </div>
    <a-pagination showSizeChanger showQuickJumper :defaultCurrent="2" :total="50"
                  :pageSizeOptions="['10','20','50','100']" @change="onChange"/>
  </a-layout-content>
</template>

<script>
    import DateSearch from "@/components/search/DateSearch";

    const data = [{
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
    }, {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
    }, {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
    }, {
        key: '4',
        name: 'Jim Red',
        age: 32,
        address: 'London No. 2 Lake Park',
    }];

    export default {
        name: "LayoutContent",
        components: {DateSearch},
        data() {
            return {
                data,
                deleteCacheLoading: false
            }
        },
        computed: {
            columns() {
                let {sortedInfo, filteredInfo} = this;
                sortedInfo = sortedInfo || {};
                filteredInfo = filteredInfo || {};
                const columns = [{
                    title: 'Name',
                    dataIndex: 'name',
                    key: 'name',
                    filters: [
                        {text: 'Joe', value: 'Joe'},
                        {text: 'Jim', value: 'Jim'},
                    ],
                    filteredValue: filteredInfo.name || null,
                    onFilter: (value, record) => record.name.includes(value),
                    sorter: (a, b) => a.name.length - b.name.length,
                    sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
                }, {
                    title: 'Age',
                    dataIndex: 'age',
                    key: 'age',
                    sorter: (a, b) => a.age - b.age,
                    sortOrder: sortedInfo.columnKey === 'age' && sortedInfo.order,
                }, {
                    title: 'Address',
                    dataIndex: 'address',
                    key: 'address',
                    filters: [
                        {text: 'London', value: 'London'},
                        {text: 'New York', value: 'New York'},
                    ],
                    filteredValue: filteredInfo.address || null,
                    onFilter: (value, record) => record.address.includes(value),
                    sorter: (a, b) => a.address.length - b.address.length,
                    sortOrder: sortedInfo.columnKey === 'address' && sortedInfo.order,
                }];
                return columns;
            }
        },
        methods: {
            deleteCache() {
                this.deleteCacheLoading = true;
                const _this = this;
                setTimeout(() => {
                    _this.deleteCacheLoading = false;
                }, 2000);
            },
            onChange() {

            },
            handleChange(value) {
                console.log(`selected ${value}`);
            },
            handleBlur() {
                console.log('blur');
            },
            handleFocus() {
                console.log('focus');
            },
            filterOption(input, option) {
                return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
        }
    }
</script>

<style scoped>

</style>

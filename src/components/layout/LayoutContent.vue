<template>
  <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }">
    <div>
      <a-row>
        <a-col :span="24">
          <label>
            <span>日期: </span>
            <div>
              <span>今天</span>
              <span>昨天</span>
              <span>本周</span>
              <span>上周</span>
              <span>本月</span>
              <span>上月</span>
            </div>
            <a-range-picker @change="dateOnChange" />
          </label>
        </a-col>
      </a-row>
      <a-divider dashed/>
      <a-row>
        <a-col :span="8">
          <label>
            <span>用户名: </span>
            <a-input placeholder="请输入用户名搜索"></a-input>
          </label>
        </a-col>
        <a-col :span="8">
          <label>
            <span>用户类型: </span>
            <a-input placeholder="用户类型"></a-input>
          </label>
        </a-col>
        <a-col :span="8">
          <label>
            <span>用户类型: </span>
            <a-input placeholder="用户类型"></a-input>
          </label>
        </a-col>
      </a-row>
      <a-divider dashed/>
      <a-row>
        <a-col :span="8">
          <label>
            <span>用户类型2: </span>
            <a-input placeholder="用户类型2"></a-input>
          </label>
        </a-col>
        <a-col :span="8">
          <div>
            <a-button type="primary" icon="search">搜索</a-button>
            <!--                  <a-button type="primary" icon="search">清楚缓存</a-button>-->
          </div>
        </a-col>
      </a-row>
      <a-divider dashed/>
    </div>
    <a-pagination showSizeChanger showQuickJumper :defaultCurrent="2" :total="50"
                  :pageSizeOptions="['10','20','50','100']" @change="onChange"/>
  </a-layout-content>
</template>

<script>
    export default {
        name: "LayoutContent",
        methods:{
            onChange(){

            },
            dateOnChange(){

            }
        }
    }
</script>

<style scoped>

</style>

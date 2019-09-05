<template>
  <a-modal title="选择上级机构" :visible="parentOrgVisible" @ok="parentOrgVisible = false"
           @cancel="parentOrgVisible = false">
    <p>
      <!--        <a-input-search style="margin-bottom: 8px" placeholder="请输入名称搜索"/>-->
      <a-tree :treeData="orgTreeData" :loadData="onLoadData"
              @select="parentOrgOnSelect"></a-tree>
    </p>
  </a-modal>
</template>

<script>
  import {getChildList} from "@/network/organization";

  export default {
    name: "OrganizationTree",
    props: {
      parentOrgVisible: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        orgTreeData: []
      }
    },
    watch: {},
    methods: {
      parentOrgOnSelect(selectedKeys, info) {
        if (selectedKeys.length === 1) {
          this.org.parentId = info.selectedNodes[0].data.props.value;
          this.form.setFieldsValue({
            parentName: info.selectedNodes[0].data.props.title
          })
        } else {
          this.org.parentId = null;
          this.form.setFieldsValue({
            parentName: null
          })
        }
      },
      onLoadData(treeNode) {
        return new Promise(resolve => {
          getChildList(treeNode.value, this.org.id).then(response => {
            treeNode.dataRef.children = response.data;
            this.orgTreeData = [...this.orgTreeData];
            resolve();
          })

        });
      }
    }
  }
</script>

<style scoped>

</style>

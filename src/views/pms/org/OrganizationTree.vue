<template>
  <a-modal title="选择上级机构" :visible="parentOrgVisible" @ok="onOk"
           @cancel="onCancel">
    <p>
      <!--        <a-input-search style="margin-bottom: 8px" placeholder="请输入名称搜索"/>-->
      <a-tree :treeData="orgTreeData" :loadData="onLoadData"
              @select="parentOrgOnSelect"></a-tree>
    </p>
  </a-modal>
</template>

<script>
  import {getChildList, getRootOrgList} from "@/network/organization";

  export default {
    name: "OrganizationTree",
    props: {
      parentOrgVisible: {
        type: Boolean,
        default: false
      },
      currentOrgId: {
        type: String,
        required: false
      }
    },
    data() {
      return {
        orgTreeData: []
      }
    },
    created() {
      getRootOrgList(this.currentOrgId).then(response => this.orgTreeData = response.data);
    },
    methods: {
      parentOrgOnSelect(selectedKeys, info) {
        const selectOrg = {
          id: null,
          orgName: null
        };
        if (selectedKeys.length === 1) {
          selectOrg.id = info.selectedNodes[0].data.props.value;
          selectOrg.orgName = info.selectedNodes[0].data.props.title;
        }
        this.$emit("onSelect", selectOrg);
      },
      onOk() {
        this.$emit("ok");
      },
      onCancel() {
        this.$emit("cancel");
      },
      onLoadData(treeNode) {
        return new Promise(resolve => {
          getChildList(treeNode.value, this.currentOrgId)
            .then(response => {
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

<template>
  <a-spin :spinning="orgSpinning" tip="加载中...">
    <!--    <a-input-search v-if="showSearch" style="margin-bottom: 8px" placeholder="请输入名称搜索" @change="orgSearchOnChange"/>-->
    <a-tree :treeData="orgTreeData" :loadData="onLoadData" @select="parentOrgOnSelect"></a-tree>
  </a-spin>
</template>

<script>
  import {getChildList, getRootOrgList} from "@/network/organization";

  export default {
    name: "OrganizationTree",
    props: {
      showSearch: {
        type: Boolean,
        default: true
      },
      statusCheck: {
        type: Boolean,
        default: true
      },
      currentOrgId: {
        type: String,
        required: false
      }
    },
    data() {
      return {
        orgTreeData: [],
        orgSpinning: false
      }
    },
    created() {
      this.getRootOrgList();
    },
    methods: {
      getRootOrgList() {
        this.orgSpinning = true;
        getRootOrgList(this.currentOrgId, this.statusCheck,)
          .then(response => this.orgTreeData = response.data)
          .finally(() => this.orgSpinning = false);
      },
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

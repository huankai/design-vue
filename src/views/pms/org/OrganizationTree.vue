<template>
  <a-spin :spinning="orgSpinning" tip="加载中...">
    <!--    <a-input-search v-if="showSearch" style="margin-bottom: 8px" placeholder="请输入名称搜索" @change="orgSearchOnChange"/>-->
    <a-tree :treeData="orgTreeData" :loadData="onLoadData" @select="parentOrgOnSelect"></a-tree>
  </a-spin>
</template>

<script>
  import {getChildList, getRootOrgList} from "@/network/organization";

  // const getParentKey = (title, tree) => {
  //   let parentKey;
  //   for (let i = 0; i < tree.length; i++) {
  //     const node = tree[i];
  //     if (node.children) {
  //       if (node.children.some(item => item.title === title)) {
  //         parentKey = node.title;
  //       } else if (getParentKey(title, node.children)) {
  //         parentKey = getParentKey(title, node.children);
  //       }
  //     }
  //   }
  //   return parentKey
  // };


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
        // expandedKeys: [],
        // autoExpandParent: true
      }
    },
    created() {
      this.getRootOrgList();
    },
    methods: {
      // onExpand(expandedKeys) {
      //   this.expandedKeys = expandedKeys;
      //   this.autoExpandParent = false
      // },
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
      // orgSearchOnChange(e) {
      //   const value = e.target.value;
      //   const expandedKeys = this.orgTreeData.map((item) => {
      //     if (item.title.indexOf(value) > -1) {
      //       return getParentKey(item.title, this.orgTreeData);
      //     }
      //     return null
      //   }).filter((item, i, self) => item && self.indexOf(item) === i);
      //   Object.assign(this, {
      //     expandedKeys,
      //     searchValue: value,
      //     autoExpandParent: true
      //   })
      // },
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

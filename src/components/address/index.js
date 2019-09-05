import {findByParentId} from "@/network/address";

export default {
  name: "AddressCascader",
  props: {
    maxDepth: { //最大级别，默认只显示省，市，区 3 级
      type: Number,
      default: 3
    }
  },
  data() {
    return {
      currentDepth: 0, //记录当前级别
      addressOptions: []
    }
  },
  created() {
    this.loadAddressList();
  },
  methods: {
    loadAddressList(parentId) {
      findByParentId(parentId).then(response => {
        this.addressOptions = response.data;
      });
    },
    addressLoadData(selectedOptions) {
      if (this.currentDepth < this.maxDepth) {
        this.currentDepth = this.currentDepth++;
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
    }
  }
}

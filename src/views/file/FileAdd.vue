<template>
  <a-form :form="form">
    <a-form-item :label-col="{span:3}" label="请选择文件">
      <a-upload-dragger name="files" :multiple="true" :withCredentials="true" :action="action" :remove="handlerRemove"
                        :beforeUpload="beforeUpload">
        <p class="ant-upload-drag-icon">
          <a-icon type="inbox"/>
        </p>
        <p class="ant-upload-text">单击或拖拽文件到此区域上传</p>
      </a-upload-dragger>
    </a-form-item>
    <a-form-item :label-col="{span:20}">
      <router-link to="/file/list">
        <a-button type="default">
          <a-icon type="undo"/>
          返回
        </a-button>
      </router-link>
    </a-form-item>
  </a-form>
</template>

<script>
  import {deleteFile} from "@/network/files";
  import {uploadUrl} from "@/util/fsConstant";

  export default {
    name: "FileAdd",
    beforeCreate() {
      this.form = this.$form.createForm(this)
    },
    data() {
      return {
        action: uploadUrl
      }
    },
    methods: {
      handlerRemove(file) {
        return deleteFile(file.response.data[0].id);
      },
      beforeUpload(file) {
        const isLt10M = file.size / 1024 / 1024 < 10;
        if (!isLt10M) {
          this.$message.error("文件大小不能超过10M")
        }
        return isLt10M;
      }
      // handleFileUploadChange({file,fileList,event}) {
      //   debugger
      // }
    }
  }
</script>

<style scoped>

</style>

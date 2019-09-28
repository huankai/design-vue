<template>
  <div class="account-settings-info-view">
    <a-form :form="form">
      <a-form-item label="匿名" :label-col="{ span: 3 }" :wrapper-col="{ span: 9 }">
        <a-input
          v-decorator="['realName',{initialValue:user.realName,rules: [{ required: true, message: 'Please input your note!' }]}]"/>
      </a-form-item>
      <a-form-item label="头像" :label-col="{ span: 3 }" :wrapper-col="{ span: 9 }">
        <a-upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture-card">
          <div>
            <a-icon type="plus"/>
            <div class="ant-upload-text">点击上传</div>
          </div>
        </a-upload>
      </a-form-item>
      <a-form-item label="性别" :label-col="{ span: 3 }" :wrapper-col="{ span: 9 }">
        <a-radio-group name="userSex" :value="user.sex" @change="user.sex = (user.sex === 1 ? 2 : 1)">
          <a-radio :value="1">男</a-radio>
          <a-radio :value="2">女</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="生日" :label-col="{ span: 3 }" :wrapper-col="{ span: 9 }">
        <a-date-picker :disabledDate="disabledDate"></a-date-picker>
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
        <a-button type="primary" html-type="submit">
          更新
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
  import {endOfDay} from "@/util/moments";

  export default {
    name: "Base",
    data() {
      return {
        form: this.$form.createForm(this),
        disabledDate(current) {
          return current && current > endOfDay();
        },
        user: this.$store.getters.getCurrentUserInfo
      }
    },
  }
</script>
<style lang="less" scoped>

  .avatar-upload-wrapper {
    height: 200px;
    width: 100%;
  }

  .ant-upload-preview {
    position: relative;
    margin: 0 auto;
    width: 100%;
    max-width: 180px;
    border-radius: 50%;
    box-shadow: 0 0 4px #ccc;

    .upload-icon {
      position: absolute;
      top: 0;
      right: 10px;
      font-size: 1.4rem;
      padding: 0.5rem;
      background: rgba(222, 221, 221, 0.7);
      border-radius: 50%;
      border: 1px solid rgba(0, 0, 0, 0.2);
    }

    .mask {
      opacity: 0;
      position: absolute;
      background: rgba(0, 0, 0, 0.4);
      cursor: pointer;
      transition: opacity 0.4s;

      &:hover {
        opacity: 1;
      }

      i {
        font-size: 2rem;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -1rem;
        margin-top: -1rem;
        color: #d6d6d6;
      }
    }

    img, .mask {
      width: 100%;
      max-width: 180px;
      height: 100%;
      border-radius: 50%;
      overflow: hidden;
    }
  }
</style>

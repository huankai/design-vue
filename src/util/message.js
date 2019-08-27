import Vue from 'vue'
import {message} from "ant-design-vue";

/**
 * 消息
 */
message.config({
  duration: 1.5
});
Vue.prototype.$message = message;

import Vue from 'vue'
import {message} from "ant-design-vue";

/**
 * 消息
 */
message.config({
  duration: 2
});
Vue.prototype.$message = message;

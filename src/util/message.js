import Vue from 'vue'
import {message} from "ant-design-vue";

message.config({
  duration: 2
});
Vue.prototype.$message = message;

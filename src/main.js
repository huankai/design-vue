import Vue from 'vue'
import App from './App.vue'

import "@/util/message"

import router from "@/router";
/*
 按需要导入 ant 的组件，这里只导入了 Button
 */
import {
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  Card,
  InputNumber,
  Radio,
  Avatar,
  Icon,
  Checkbox,
  Tooltip,
  Calendar,
  Table,
  Pagination,
  Layout,
  Popconfirm,
  LocaleProvider,
  Menu,
  Badge,
  Breadcrumb,
  Col,
  Row,
  Divider,
  notification,
  Modal,

  Dropdown
} from 'ant-design-vue';

Vue.config.productionTip = false;

Vue.use(Form);
Vue.use(Input);
Vue.use(DatePicker);
Vue.use(Select);
Vue.use(Button);
Vue.use(Card);
Vue.use(InputNumber);
Vue.use(Radio);
Vue.use(Avatar);
Vue.use(Icon);
Vue.use(Checkbox);
Vue.use(Tooltip);
Vue.use(Calendar);
Vue.use(Table);
Vue.use(Pagination);
Vue.use(Layout);
Vue.use(Popconfirm);
Vue.use(LocaleProvider);
Vue.use(Menu);
Vue.use(Badge);
Vue.use(Breadcrumb);
Vue.use(Col);
Vue.use(Row);
Vue.use(Divider);
Vue.use(notification);
Vue.use(Modal);
Vue.use(Dropdown);
new Vue({
  "el": "#app",
  router,
  render: h => h(App),
});

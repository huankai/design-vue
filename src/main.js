import Vue from 'vue'
import App from './App.vue'

import "@/util/message"

import "@/util/validate"

import router from "@/router";

import store from "@/store";

/*
 按需要导入 ant 的组件，这里只导入了 Button
 */
import {
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  Switch,
  Upload,
  Card,
  InputNumber,
  Radio,
  Avatar,
  Icon,
  Checkbox,
  Tooltip,
  Spin,
  Calendar,
  Table,
  Tag,
  Pagination,
  Layout,
  Popconfirm,
  LocaleProvider,
  Menu,
  Tree,
  Badge,
  Breadcrumb,
  Col,
  Row,
  Divider,
  Modal,
  Dropdown
} from 'ant-design-vue';

Vue.config.productionTip = false;

Vue.use(Form);
Vue.use(Input);
Vue.use(DatePicker);
Vue.use(Select);
Vue.use(Button);
Vue.use(Switch);
Vue.use(Upload);
Vue.use(Card);
Vue.use(InputNumber);
Vue.use(Radio);
Vue.use(Avatar);
Vue.use(Icon);
Vue.use(Checkbox);
Vue.use(Tooltip);
Vue.use(Spin);
Vue.use(Calendar);
Vue.use(Table);
Vue.use(Tag);
Vue.use(Pagination);
Vue.use(Layout);
Vue.use(Popconfirm);
Vue.use(LocaleProvider);
Vue.use(Menu);
Vue.use(Tree);
Vue.use(Badge);
Vue.use(Breadcrumb);
Vue.use(Col);
Vue.use(Row);
Vue.use(Divider);
Vue.use(Modal);
Vue.use(Dropdown);
new Vue({
  "el": "#app",
  router,
  store,
  render: h => h(App)
});

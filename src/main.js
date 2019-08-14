import Vue from 'vue'
import App from './App.vue'
/*
 按需要导入 ant 的组件，这里只导入了 Button
 */
import {Button} from 'ant-design-vue';

Vue.config.productionTip = false;

Vue.component(Button.name, Button);
new Vue({
    "el": "#app",
    render: h => h(App),
});

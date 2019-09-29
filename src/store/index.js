import Vue from "vue"
import Vuex from "vuex"

import mutations from "@/store/mutations"
import actions from "@/store/actions"
import getters from "@/store/getters"


Vue.use(Vuex);

const state = {

  /*
    记录当前打开的菜单
   */
  currentMenuOpenKeys: [],
  userInfo: null
};

export default new Vuex.Store({

  /*
   * 保存共享状态的地方
   */
  state,

  /*
      vuex 不建议使用 $store.变量名 来修改值，这样无法跟踪是哪个组件修改了值
          可以在 mutations 中定义方法，然后使用 $store.方法名来调用
   */
  mutations,

  /*
      异步操作
      在使用 mutations 中修改 state 中的数据只能是同步的，如果要使用异步操作，必须使用 actions
   */
  actions,
  /*
      与 计算属性类型，当在 state 中定义的数据需要使用计算后返回时，可以在这里定义
   */
  getters

});

import {updateMenu, menuSessionStoreKey, setUserInfo} from "@/store/mutations-types";

export default {

  [updateMenu](state, openKeys) {
    state.currentMenuOpenKeys = openKeys;
    sessionStorage.setItem(menuSessionStoreKey, JSON.stringify(openKeys));
  },

  [setUserInfo](state, userInfo) {
    state.userInfo = userInfo;
  }
}

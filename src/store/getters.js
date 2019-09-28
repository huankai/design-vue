import {menuSessionStoreKey} from "@/store/mutations-types";

export default {

  getCurrentMenu(state) {
    let currentMenuOpenKeys = state.currentMenuOpenKeys;
    return currentMenuOpenKeys.length === 0 ? JSON.parse(sessionStorage.getItem(menuSessionStoreKey)) : currentMenuOpenKeys;
  },

  getCurrentUserInfo(state) {
    return state.userInfo;
  }
}
